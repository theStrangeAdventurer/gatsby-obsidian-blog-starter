import React from 'react';
import * as styles from './ContentWrapper.module.css';

export function ContentWrapper({ children }) {
    return (
        <div className={'container mx-auto px-4 mt-16 relative ' + styles.contentWrapper}>
            {children}
        </div>
    )
}