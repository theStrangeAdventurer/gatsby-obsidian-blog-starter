import React from 'react';
import { graphql } from 'gatsby';

/**
 * Запрос для получения одного поста по его slug
 * slug - это часть URL, которая идет после домена
 * slug передается в компонент через контекст, который мы задали в 
 * gatsby-node.js (module.exports = { createPages })
 */
export const query = graphql`
    query BlogPageQuery($slug: String!) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
            html
        }
        site {
            siteMetadata {
                description
                social {
                    siteUrl
                    twitter
                    twitterUsername
                }
                title
            }
        }
    }
`

/**
 * Рендерим пост, используя данные gql запроса
 */
export default function BlogPage(props) {
    const { markdownRemark } = props.data;
    const { html } = markdownRemark;
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
}
