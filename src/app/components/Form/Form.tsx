'use client'
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Form.module.css';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Отправляем данные на сервер
            const response = await axios.post('/api/form', formData);
            console.log('Данные отправлены:', response.data);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <input
                className={styles.inputField}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                className={styles.inputField}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                className={styles.inputField}
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <button className={styles.submitButton} type="submit">Submit</button>
        </form>
    );
};

export default Form;
