'use client'
import React, { useState } from 'react';
import axios from 'axios';
import styles from './DataFetcher.module.css';

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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
