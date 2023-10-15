import React from 'react';
import cn from 'classnames';

import { GithubIcon } from '../Icons';
import * as styles from './GithubRepo.module.css';

export function GithubRepo({ url }) {
    return (
        <a className={styles.container} title='Если лень читать пост, можно перейти сразу к коду' href={url} rel="nofollow noopener" target="_blank">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div>
                    <GithubIcon color='rgb(99, 102, 241)' size={48} />
                </div>
                <div>
                    <button class="bg-black text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded">
                        Перейти в Github
                    </button>
                </div>
            </div>
        </a>
    );
}