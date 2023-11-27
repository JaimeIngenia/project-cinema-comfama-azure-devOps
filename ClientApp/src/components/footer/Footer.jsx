import React from 'react';
import styles from './Footer.module.css'
import footer from '../../assets/footer.svg'

const Footer = () => {
    return (
        <div className={styles.container}>
            <img className={styles.container__footer} src={footer} alt="" />

        </div>
    );
}

export default Footer;
