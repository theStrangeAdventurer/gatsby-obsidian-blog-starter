import React from 'react';
import { graphql, Link } from 'gatsby';

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
            frontmatter {
                date
            }
            fields {
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
    const { html, fields, frontmatter } = markdownRemark;
    const { title } = fields;
    const { date } = frontmatter;
    return <div className='container mx-auto px-4 mt-16'>
        <h1 className='text-4xl font-bold mb-4'>{title}</h1>
        <div className='flex gap-2 mb-4'>
            <Link to='/' className='text-indigo-600'>{'Назад'}</Link>
            <span className='text-gray-300'>{date}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }}/>
    </div>
}
