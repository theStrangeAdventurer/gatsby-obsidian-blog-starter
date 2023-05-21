import React from 'react';
import { useSiteMetadata } from '../../hooks/use-site-metadata';

export const SEO = ({ title, description, pathname, children, image }) => {
    const { title: defaultTitle, description: defaultDescription, social, siteUrl } = useSiteMetadata()
    const { profileImage, twitterUsername } = social;

    const seo = {
        title: title || defaultTitle.replace(/%/g, ''),
        description: description || defaultDescription,
        image: image ? `${siteUrl}${image}` : `${siteUrl}${profileImage}`,
        url: `${siteUrl}${pathname || ``}`,
        twitterUsername,
    };

    return (
        <>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:url" content={seo.url} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
            <meta name="twitter:creator" content={seo.twitterUsername} />
            {process.env.FAVICON_DOMAIN && <link rel="icon" href={process.env.FAVICON_DOMAIN + "/favicon.ico"} type="image/x-icon"></link>}
            {children}
        </>
    )
}