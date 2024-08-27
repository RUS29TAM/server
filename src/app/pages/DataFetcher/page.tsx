'use client'
import React, {useState} from 'react';
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
    const [editingItem, setEditingItem] = useState<DataItem | null>(null);

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

    const editData = async (updatedItem: DataItem) => {
        try {
            await axios.put(`http://localhost:5000/api/data/${updatedItem._id}`, updatedItem);
            setData(data.map(item => (item._id === updatedItem._id ? updatedItem : item)));
            setEditingItem(null); // Сброс редактируемого элемента после успешного обновления
        } catch (err) {
            setError('Ошибка при изменении данных');
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
                        {editingItem && editingItem._id === item._id ? (
                            <div className={styles.editForm}>
                                <input
                                    className={styles.inputField}
                                    type="text"
                                    value={editingItem.author}
                                    onChange={(e) => setEditingItem({...editingItem, author: e.target.value})}
                                />
                                <input
                                    className={styles.inputField}
                                    type="text"
                                    value={editingItem.age}
                                    onChange={(e) => setEditingItem({...editingItem, age: e.target.value})}
                                />
                                <input
                                    className={styles.inputField}
                                    type="text"
                                    value={editingItem.word}
                                    onChange={(e) => setEditingItem({...editingItem, word: e.target.value})}
                                />
                                <textarea
                                    className={styles.textArea}
                                    value={editingItem.description}
                                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                                />
                                <div className={styles.btnWrapper}>
                                    <button className={styles.acceptEditButton}
                                            onClick={() => editData(editingItem)}>Сохранить
                                    </button>
                                    <button className={styles.cancelEditButton}
                                            onClick={() => setEditingItem(null)}>Отмена
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p><strong>Автор</strong> {item.author}</p>
                                <p><strong>Возраст</strong> {item.age} лет</p>
                                <p><strong>Слово</strong> {item.word}</p>
                                <p><strong>Значение</strong> {item.description}</p>
                                <div className={styles.btnWrapper}>

                                    <button
                                        className={styles.editButton}
                                        onClick={() => setEditingItem(item)}
                                    >
                                        Изменить
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => item._id && deleteData(item._id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <Link className={styles.loadButton} href={'/'}>
                {loading ? 'Загрузка...' : 'Вернуться назад'}
            </Link>
        </div>
    );
};

export default Page;
