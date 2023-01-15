import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export function UserInfo() {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    description
                    title
                    social {
                    siteUrl
                    twitter
                    twitterUsername
                    }
                }
            }
        }
    `);

    const {
        title,
        description,
        author,
    } = data.site.siteMetadata;

    const {
        twitter,
        twitterUsername,
    } = data.site.siteMetadata.social;
    
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{author}</p>
            <a target={'_blank'} href={twitter}>{twitterUsername}</a>
        </div>
    )
}