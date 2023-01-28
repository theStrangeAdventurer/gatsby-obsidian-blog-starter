import React from 'react';
import { graphql, Link } from 'gatsby';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer/Footer';

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
            excerpt
            frontmatter {
                date
                stage
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
    const { date, stage } = frontmatter;
    const formattedDate = new Intl.DateTimeFormat('ru-Ru').format(new Date(date));
    return <>
        <div className='container mx-auto px-4 mt-16'>
            <h1 className='text-4xl font-bold mb-4'>{title}</h1>
            <div className='flex gap-2 mb-4'>
                <Link to='/' className='text-indigo-600'>{'Назад'}</Link>
                <span className='text-gray-300'>{formattedDate}</span>
                {stage === 'readyToPublish' &&
                    <span className="text-green-500 ml-2">Дополняется...</span>}
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }}/>
        </div>
        <Footer />
    </>
}

export const Head = (props) => {
    const { markdownRemark } = props.data;
    const { excerpt, fields } = markdownRemark;
    const { title } = fields;
    return (
        <SEO title={title} description={excerpt} />
    )
}