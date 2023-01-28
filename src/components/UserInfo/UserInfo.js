import React from 'react'
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import { TwitterIcon, GithubIcon } from '../Icons';

export function UserInfo() {
    const data = useSiteMetadata();
    const {
        title,
        description,
        author,
    } = data;

    const {
        profileImage: avatar,
        github,
        twitter,
        twitterUsername,
    } = data.social;

    return (
        <div className="xs:flex-col sm:flex sm:items-center gap-8 mb-16">
            <div className='flex-col shrink-0 gap-4'>
                <img width={128} height={128} className='' alt={`${twitterUsername} avatar image`} src={avatar} style={{ borderRadius: '50%' }} />
                <div className='flex gap-4 mt-4 sm:justify-center xs:mb-4 sm:mb-0'>
                    <a
                        rel="noreferrer" 
                        target={'_blank'}
                        href={twitter}
                    >
                        <TwitterIcon />
                    </a>
                    <a
                        rel="noreferrer" 
                        target={'_blank'}
                        href={github}
                    >
                        <GithubIcon />
                    </a>
                </div>
            </div>
            <div>
                <h3
                    className="xs:text-l font-bold text-zinc-800 sm:text-5xl"
                >
                    {title}
                </h3>
                <p
                    style={{ maxWidth: 800 }}
                    className='mt-4 text-base text-zinc-600'
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }} 
                />
                <p className='px-3 py-2'>
                    {author}
                </p>
            </div>
        </div>
    )
}