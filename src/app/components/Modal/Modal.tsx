import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    formData: {
        author: string;
        lastName: string;
        message: string;
    };
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ formData, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    Данные успешно отправлены!
                </div>
                <div className={styles.modalBody}>
                    <p><strong>First Name:</strong> {formData.author}</p>
                    <p><strong>Last Name:</strong> {formData.lastName}</p>
                    <p><strong>Message:</strong> {formData.message}</p>
                </div>
                <button className={styles.closeButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
