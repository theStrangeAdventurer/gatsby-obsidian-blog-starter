import React from 'react';
import { graphql, Link } from 'gatsby';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer/Footer';
import { ContentWrapper } from '../components/ContentWrapper';
import { Tags } from '../components/Tags';
import { GithubRepo } from '../components/GithubRepo';
import * as styles from './BlogPost.module.css'; 
import { filterPosts } from '../../utils/posts';

/**
 * Запрос для получения одного поста по его slug
 * slug - это часть URL, которая идет после домена
 * slug передается в компонент через контекст, который мы задали в 
 * gatsby-node.js (module.exports = { createPages })
 */
export const query = graphql`
    query BlogPageQuery($slug: String!, $tags: [String!]!) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
            id
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
                seoTitle
                seoDescription
            }
        }
        allMarkdownRemark(filter: { frontmatter: { tags: { in: $tags }}}) {
            nodes {
                excerpt
                frontmatter {
                  github
                  tags
                }
                id
                htmlAst
                fields {
                  slug
                  title
                  stage
                  seoDescription
                }
                timeToRead
            }
        }
    }
`

/**
 * Рендерим пост, используя данные gql запроса
 */
export default function BlogPage(props) {
    const { markdownRemark, allMarkdownRemark: _relatedPosts } = props.data;
    const { html, fields, frontmatter, id: currentPostId } = markdownRemark;
    const { title } = fields;

    /**
     * @type{Array<import('./types').RelatedPost>}
     */
    const relatedPosts = filterPosts(_relatedPosts.nodes).filter(({ id }) => id !== currentPostId);
    
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

            {relatedPosts?.length > 0 && (
                <div className="mt-8" itemScope itemType="http://schema.org/ItemList">
                    <h3 className="text-xl font-bold mb-4">Вам также может быть интересно</h3>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {relatedPosts.map((post, index) => {
                            const { htmlAst } = post;
                            const imgSrc = findFirstImage(htmlAst);
                            return (
                                <div key={post.id} className="bg-white shadow-md rounded-lg p-4" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                    <meta itemProp="position" content={index + 1} />
                                    <h4 className="text-lg font-semibold mb-2" itemProp="name">{post.fields.title}</h4>
                                    {imgSrc && <img src={imgSrc} alt={post.fields.title} className="w-full h-40 object-cover mb-2" itemProp="image" />}
                                    <p className="text-gray-600" itemProp="description">{post.excerpt}</p>
                                    <Link to={`/${post.fields.slug}/`} className="text-blue-500 hover:underline" itemProp="url">Читать</Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </ContentWrapper>
        <Footer />
    </>
}

export const Head = (props) => {
    const { markdownRemark } = props.data;
    const { excerpt, fields, htmlAst } = markdownRemark;
    const { title, seoTitle, seoDescription } = fields;
    return (
        <SEO image={findFirstImage(htmlAst)} title={seoTitle || title} description={seoDescription || excerpt} />
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