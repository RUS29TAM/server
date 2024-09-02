'use client'
import React, {useState} from 'react';
import axios from 'axios';
import styles from './Form.module.css';
import Modal from '../../components/Modal/Modal';
import Link from "next/link";

interface FormData {
    author: string;
    age: string;
    word: string;
    description: string;
}

const randomWords = ['Оказывается слово', 'Представляешь', 'Разве ты не знаешь, что', 'Запомни', 'Будь в курсе']; // Массив случайных слов

const Page: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        author: '',
        age: '',
        word: '',
        description: ''
    });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [randomWord, setRandomWord] = useState<string>(''); // Состояние для случайного слова
    const [modalMessage, setModalMessage] = useState<string>(''); // Состояние для случайного слова

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Сначала проверяем, существует ли слово
            const checkResponse = await axios.get('http://localhost:5000/api/check-word', {
                params: {word: formData.word}
            });

            if (checkResponse.data.exists) {
                setModalMessage('Такое слово уже есть в словаре!'); // Уведомляем пользователя, что слово уже есть
                setShowModal(true);
                return; // Останавливаем выполнение, если слово существует
            }

            // Если слова нет, продолжаем с отправкой формы
            const response = await axios.post('http://localhost:5000/api/data', formData);
            console.log('Данные отправлены:', response.data);

            // Выбор случайного слова
            const randomIndex = Math.floor(Math.random() * randomWords.length);
            setRandomWord(randomWords[randomIndex]);

            // Показать всплывающее окно
            setModalMessage('Словарь успешно пополнен!');
            setShowModal(true);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Очистка полей формы после успешной отправки
        setFormData({
            author: '',
            age: '',
            word: '',
            description: ''
        });
    };

    const clearField = (fieldName: keyof FormData) => {
        setFormData({
            ...formData,
            [fieldName]: ''
        });
        console.log('clear')
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.inputField}
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Кому пренадлежит слово"
                        required
                        maxLength={25}
                    />
                    <button
                        type="button"
                        className={styles.clearButton}
                        onClick={() => clearField('author')}
                    >
                        &times;
                    </button>
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.inputField}
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Полных лет автору"
                        required
                        maxLength={25}
                    />
                    <button
                        type="button"
                        className={styles.clearButton}
                        onClick={() => clearField('age')}
                    >
                        &times;
                    </button>
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.inputField}
                        type="text"
                        name="word"
                        value={formData.word}
                        onChange={handleChange}
                        placeholder="Слово"
                        required
                        maxLength={25}
                    />
                    <button
                        type="button"
                        className={styles.clearButton}
                        onClick={() => clearField('word')}
                    >
                        &times;
                    </button>
                </div>
                <div className={styles.textAreaWrapper}>
                <textarea
                    className={styles.textArea}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Описание"
                    required
                    maxLength={160}
                />
                    <button
                        type="button"
                        className={styles.clearButton}
                        onClick={() => clearField('description')}
                    >
                        &times;
                    </button>
                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.submitButton} type="submit">Отправить</button>
                    <Link className={styles.viewButton} type="button" href={'/'}>Назад</Link>
                </div>
            </form>
            {showModal && (
                <Modal modalMessage={modalMessage} formData={formData} randomWord={randomWord}
                       onClose={handleCloseModal}/>
            )}
        </div>
    );
};

export default Page;
