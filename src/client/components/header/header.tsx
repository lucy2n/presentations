import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../header/header.module.css';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.main}>
            <p onClick={() => navigate('/')}>
                presentation app
            </p>
        </div>
    )
}

export default Header;