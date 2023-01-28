import React from 'react';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import { GithubIcon, TwitterIcon } from '../Icons';

export function Footer() {
    const { social: { github, twitter }, title, } = useSiteMetadata();
    
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-indigo-50 py-4 mt-6'>
            <div className='container mx-auto px-4'>
                <div className='flex justify-center gap-4'>
                    <a className='w-6 h-6' href={github} target='_blank' rel='noreferrer'>
                        <GithubIcon />
                    </a>
                    <a href={twitter} target='_blank' rel='noreferrer'>
                        <TwitterIcon />
                    </a>
                </div>
                <div className='flex justify-center mt-4'>
                    <p className='text-indigo-500'>
                        © {currentYear} {title}
                    </p>
                </div>
            </div>
        </footer>
    );
}