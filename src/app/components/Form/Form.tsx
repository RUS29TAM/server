'use client'
import React, {useState} from 'react';
import axios from 'axios';
import styles from './Form.module.css';
import Modal from '../Modal/Modal';
import Link from "next/link";

interface FormData {
    author: string;
    age: string;
    word: string;
    description: string;
}

const randomWords = ['Оказывается слово', 'Представляешь', 'Разве ты не знаешь, что', 'Запомни', 'Будь в курсе']; // Массив случайных слов

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        author: '',
        age: '',
        word: '',
        description: ''
    });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [randomWord, setRandomWord] = useState<string>(''); // Состояние для случайного слова

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
            // Отправляем данные на сервер
            const response = await axios.post('http://localhost:5000/api/data', formData);
            console.log('Данные отправлены:', response.data);
            // Выбор случайного слова
            const randomIndex = Math.floor(Math.random() * randomWords.length);
            setRandomWord(randomWords[randomIndex]);
            // Показать всплывающее окно
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
    const clearForm = () => {
        setFormData({
            author: '',
            age: '',
            word: '',
            description: ''
        });
    };

    return (
        <>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
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
                    {/*<button className={styles.clearTextArea} onClick={clearForm}>&times;</button>*/}
                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.clearButton} type="button" onClick={clearForm}>Удалить</button>
                    <button className={styles.submitButton} type="submit">Отправить</button>
                    <Link className={styles.viewButton} type="button" href={'/pages/DataFetcher'}>Просмотр</Link>


                </div>

            </form>
            {showModal && (
                <Modal formData={formData} randomWord={randomWord} onClose={handleCloseModal}/>
            )}
        </>


    );
};

export default Form;
