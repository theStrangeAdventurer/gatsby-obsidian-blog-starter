import React from 'react';
import { graphql, Link } from 'gatsby';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer/Footer';
import { ContentWrapper } from '../components/ContentWrapper';
import { Tags } from '../components/Tags';

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
            htmlAst
            excerpt
            frontmatter {
                date
                stage
                tags
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
    let { tags = [] } = frontmatter;
    tags = tags.map(tag => ({ value: tag, title: `Перейти к постам с тегом ${tag}` }));
    const { date, stage } = frontmatter;
    const formattedDate = new Intl.DateTimeFormat('ru-Ru').format(new Date(date));
    return <>
        <ContentWrapper>
            <h1 className='text-4xl font-bold mb-4'>{title}</h1>
            <Tags tags={tags} />
            <div className='flex gap-2 mb-4'>
                <Link to='/' className='text-indigo-600'>{'Назад'}</Link>
                <span className='text-gray-300'>{formattedDate}</span>
                {stage === 'readyToPublish' &&
                    <span className="text-green-500 ml-2">Дополняется...</span>}
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }}/>
        </ContentWrapper>
        <Footer />
    </>
}

export const Head = (props) => {
    const { markdownRemark } = props.data;
    const { excerpt, fields, htmlAst } = markdownRemark;
    const { title } = fields;
    return (
        <SEO image={findFirstImage(htmlAst)} title={title} description={excerpt} />
    )
}

function findFirstImage(astNode) {
    if (astNode?.type === 'element' && astNode?.tagName === 'img') {
      return astNode.properties.src;
    }
    
    let imgSrc = null;
    let i = 0;

    while (astNode && typeof astNode?.children?.[i] === 'object') {
        imgSrc = findFirstImage(astNode.children[i]);
        if (imgSrc) {
            break;
        }
        i++;
    }

    return imgSrc;
}