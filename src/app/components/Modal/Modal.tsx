import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    formData: {
        author: string;
        age: string;
        word: string;
        description: string;
    };
    randomWord: string; // Новое свойство для случайного слова
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ formData, randomWord, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    Данные успешно отправлены!
                </div>
                <div className={styles.modalBody}>
                    <p><strong> {randomWord} </strong> <strong> <strong>&quot;</strong>{formData.word}<strong>&quot;</strong></strong> это {formData.description}</p>
                    {/*<p><strong>Это:</strong> {formData.message}</p>*/}
                    <p><strong>Автор:</strong> {formData.author}</p>
                </div>
                <button className={styles.closeButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
