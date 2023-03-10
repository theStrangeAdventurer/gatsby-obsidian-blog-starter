import React from 'react'
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import { GradientText } from '../GradientText';
import { HeroTitle } from '../HeroTitle/HeroTitle';
import { TwitterIcon, GithubIcon } from '../Icons';

export function UserInfo() {
    const data = useSiteMetadata();
    let {
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

    let titleMatch = title.match(/%(\w+)%/);

    let selectedWord = null;

    if (titleMatch) {
        title = title.replace(titleMatch[0], '');
        selectedWord = titleMatch[1];
    }

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
                <HeroTitle as='h1'>
                    {title}
                    {selectedWord ? <GradientText>{selectedWord}</GradientText> : null}
                </HeroTitle>
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