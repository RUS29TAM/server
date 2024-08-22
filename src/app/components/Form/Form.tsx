'use client'
import React, {useState} from 'react';
import axios from 'axios';
import styles from './Form.module.css';
import Modal from '../Modal/Modal';

interface FormData {
    author: string;
    lastName: string;
    message: string;
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        author: '',
        lastName: '',
        message: ''
    });
    const [showModal, setShowModal] = useState<boolean>(false);

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
            const response = await axios.post('http://localhost:5000/api/form', formData);
            console.log('Данные отправлены:', response.data);

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
            lastName: '',
            message: ''
        });
    };
    const clearForm = () => {
        setFormData({
            author: '',
            lastName: '',
            message: ''
        });
    };

    return (
        <>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
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
                    <button className={styles.clearInput} onClick={() => setFormData}>&times;</button>
                </div>

                <div className={styles.inputContainer}>
                    <input
                        className={styles.inputField}
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Слово"
                        required
                        maxLength={25}
                    />
                    <button className={styles.clearInput} onClick={clearForm}>&times;</button>
                </div>

                <div className={styles.inputContainer}>
                <textarea
                    className={styles.textArea}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Описание"
                    required
                    maxLength={160}
                />
                    <button className={styles.clearTextArea} onClick={clearForm}>&times;</button>
                </div>
                <button className={styles.submitButton} type="submit">Отправить</button>
            </form>
            {showModal && (
                <Modal formData={formData} onClose={handleCloseModal}/>
            )}
        </>


    );
};

export default Form;
