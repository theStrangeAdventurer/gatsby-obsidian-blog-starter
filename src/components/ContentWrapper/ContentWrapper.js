import React from 'react';
import * as styles from './ContentWrapper.module.css';

export function ContentWrapper({ children, className }) {
    return (
        <div className={'container mx-auto sm:px-4 md:px-16 relative ' + styles.contentWrapper + ' ' + (className || '')}>
            <div className='bg-slate-50 px-4 md:px-16  py-4 rounded-lg'>
                {children}
            </div>
        </div>
    )
}