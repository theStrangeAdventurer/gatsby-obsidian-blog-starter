import React from 'react';

export function HeroTitle({ children, as = 'h3' }) {
    const Tag = as;

    return (
        <Tag className=' xs:text-l font-bold text-zinc-800 sm:text-5xl'>
            {children}
        </Tag>
    )   
}