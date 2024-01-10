import React from 'react';
import { graphql, Link } from 'gatsby';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer/Footer';
import { ContentWrapper } from '../components/ContentWrapper';
import { Tags } from '../components/Tags';
import { GithubRepo } from '../components/GithubRepo';
import * as styles from './BlogPost.module.css'; 

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
                github
                updated
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

    let { tags = [], github, date, stage, updated = null } = frontmatter;
    tags = tags.map(tag => ({ value: tag, title: `Перейти к постам с тегом ${tag}` }));
    const formattedDate = new Intl.DateTimeFormat('ru-Ru').format(new Date(date));
    const updatedDate = updated ? new Intl.DateTimeFormat('ru-Ru').format(new Date(updated)) : null;

    return <>
        <ContentWrapper className={styles.post}>
            <h1 className='text-4xl font-bold mb-4'>{title}</h1>
            <div className='flex items-center md:justify-between gap-2 mb-4'>
                <Link to='/' className='text-white px-4 py-2 bg-indigo-600 hover:bg-slate-900 hover:text-slate-100 rounded-lg'>{'Назад'}</Link>
                <span className='text-slate-400'>{`${formattedDate}${updatedDate ? `(Обновлено ${updatedDate})` : ''}`}</span>
                {stage === 'readyToPublish' &&
                    <span className="text-green-500 ml-2">Дополняется...</span>}
            </div>
            <div style={{ display: github ? 'flex' : 'block'  }} className={ 'bg-white' + ' ' + styles.tagsContainer}>
                <div>{github ? <GithubRepo url={github}  /> : null}</div>
                <div>
                    <Tags tags={tags} />
                </div>
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