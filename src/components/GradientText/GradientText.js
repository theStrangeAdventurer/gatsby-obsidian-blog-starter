import React from 'react';
import * as styles from './GradientText.module.css';

export function GradientText({ children, as = 'span', isBold }) {
    const Tag = as;
    return (
        <Tag className={`${styles.gradientText} ${isBold ? 'font-bold' : ''}`}>
            {children}
        </Tag>
    )   
}