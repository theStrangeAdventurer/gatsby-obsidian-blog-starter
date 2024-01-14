import React from 'react';

import { GithubIcon } from '../Icons';
import * as styles from './GithubRepo.module.css';

export function GithubRepo({ url }) {
    return (
        <a className={styles.container} title='Если лень читать пост, можно перейти сразу к коду' href={url} rel="noreferrer nofollow noopener" target="_blank">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div>
                    <GithubIcon color='#1e293b' size={48} />
                </div>
                <div>
                    <button className="bg-gray-900 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded">
                        Перейти в Github
                    </button>
                </div>
            </div>
        </a>
    );
}