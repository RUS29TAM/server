'use client'
import React, { useState } from 'react';
import axios from 'axios';
import styles from './DataFetcher.module.css';
import Link from "next/link";

interface DataItem {
    _id?: string;
    author: string;
    age: string;
    word: string;
    description: string;
}

const Page: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/data'); // Замените URL на свой
            console.log('Данные запрошены:', response.data);
            setData(response.data);
        } catch (err) {
            setError('Ошибка при загрузке данных');
        } finally {
            setLoading(false);
        }
    };

    const deleteData = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/data/${id}`);
            // Удаление элемента из состояния после успешного удаления на сервере
            setData(data.filter(item => item._id !== id));
        } catch (err) {
            setError('Ошибка при удалении данных');
        }
    };

    return (
        <div className={styles.dataFetcher}>
            <button className={styles.loadButton} onClick={fetchData} disabled={loading}>
                {loading ? 'Загрузка...' : 'Загрузить данные'}
            </button>

            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.dataContainer}>
                {data.map((item) => (
                    <div key={item._id} className={styles.dataItem}>
                        <p><strong>Автор</strong> {item.author}</p>
                        <p><strong>Возраст</strong> {item.age} &nbsp; лет</p>
                        <p><strong>Слово</strong> {item.word}</p>
                        <p><strong>Значение</strong> {item.description}</p>
                        <button
                            className={styles.deleteButton}
                            onClick={() => item._id && deleteData(item._id)}
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
            <Link className={styles.loadButton} href={'/'} >
                {loading ? 'Загрузка...' : 'Вернуться назад'}
            </Link>
        </div>
    );
};

export default Page;
