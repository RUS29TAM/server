import React from 'react';
import styles from './Modal.module.css';
import Link from "next/link";

interface ModalProps {
    modalMessage: string;
    formData?: {
        author?: string;
        age?: string;
        word?: string;
        description?: string;
    };
    randomWord?: string; // Новое свойство для случайного слова
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({modalMessage, formData, randomWord, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    {modalMessage}
                </div>
                {formData && randomWord && modalMessage === 'Словарь успешно пополнен!' && (
                    <div className={styles.modalBody}>
                        <p><strong> {randomWord} </strong> <strong> <strong>&quot;</strong>{formData?.word}<strong>&quot;</strong></strong> это {formData?.description}</p>
                        <p><strong>Автор:</strong> {formData.author}</p>
                    </div>
                )}
                <div className={styles.modalFooter}>
                    <button className={styles.closeButton} onClick={onClose}>
                        {modalMessage === 'Словарь успешно пополнен!' ? 'Новое слово' : 'Закрыть'}
                    </button>
                    {modalMessage === 'Словарь успешно пополнен!' && (
                        <Link className={styles.closeButton} href={'/pages/DataFetcher'}>
                            Просмотр
                        </Link>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Modal;
