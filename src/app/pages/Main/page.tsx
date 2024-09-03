'use client'
import React from 'react';
import style from './Main.module.css';
import Link from "next/link";

const Form: React.FC = () => {

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.box}>
                    <Link href={'/pages/Form'}>
                        <h2 className={style.cardHeader}>Пополнить словарь</h2>
                        <img className={style.img}
                             alt={'img_unsplash'}
                             src={'https://images.unsplash.com/photo-1556696863-6c5eddae0f5f?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}>
                        </img>
                    </Link>
                </div>
                <div className={style.box}>
                    <Link href={'/pages/GuessWord'}>
                        <h2 className={style.cardHeader}>Угадать слово</h2>
                        <img className={style.img}
                             alt={'img_unsplash'}
                             src={'https://images.unsplash.com/photo-1516246843873-9d12356b6fab?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}>
                        </img>
                    </Link>
                </div>
                <div className={style.box}>
                    <Link href={'/pages/DataFetcher'}>
                        <h2 className={style.cardHeader}>Смотреть словарь</h2>
                        <img className={style.img}
                             alt={'img_unsplash'}
                             src={'https://images.unsplash.com/photo-1511923468502-4e48e59ef6f5?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}>
                        </img>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Form;
