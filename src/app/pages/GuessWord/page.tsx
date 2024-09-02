'use client'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './GuessWord.module.css';
import Modal from '../../components/Modal/Modal';
import Link from "next/link";

const GuessWord: React.FC = () => {
    const [randomWord, setRandomWord] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');

    // Получение случайного слова при загрузке компонента
    useEffect(() => {
        const savedWord = localStorage.getItem('randomWord');
        if (savedWord) {
            setRandomWord(savedWord);
        }
    }, []);

    const fetchRandomWord = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/random-word');
            setRandomWord(response.data.word);
            localStorage.setItem('randomWord', response.data.word); // Сохранение в localStorage
        } catch (error) {
            console.error('Ошибка при получении случайного слова:', error);
            setModalMessage('Все слова были использованы. Начинаем сначала.');
            setShowModal(true);
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/check-description', {
                word: randomWord,
                description: description,
            });

            if (response.data.correct) {
                setModalMessage('Вы угадали!');
            } else {
                setModalMessage('Нет, неверно!');
            }
            setShowModal(true);
        } catch (error) {
            console.error('Ошибка при проверке описания:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        localStorage.removeItem('randomWord');
        if (modalMessage === 'Вы угадали!') {
            fetchRandomWord(); // Получить новое слово, если угадали
            setRandomWord('')
            setDescription(''); // Очистить поле для нового описания
        } else {
            setDescription(''); // Очистить поле для повторной попытки
        }
    };

    const clearField = () => {
        setDescription('');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formContainer}>
                <h2>Что значит слово: {randomWord}</h2>
                <h2></h2>
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.inputField}
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Введите описание..."
                        maxLength={50}
                    />
                    <button
                        type="button"
                        className={styles.clearButton}
                        onClick={clearField}
                    >
                        &times;
                    </button>
                </div>
                <div className={styles.btnWrapper}>
                    {!randomWord && !description
                        ?
                        <>
                            <button className={styles.submitButton} onClick={fetchRandomWord}>Начать</button>
                            <Link className={styles.submitButton} href={'/'}>Назад</Link>
                        </>
                        :
                        <button className={styles.submitButton} onClick={handleSubmit}>Проверить</button>
                    }
                </div>
                {showModal && (
                    <Modal
                        modalMessage={modalMessage}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </div>

    );
};

export default GuessWord;
