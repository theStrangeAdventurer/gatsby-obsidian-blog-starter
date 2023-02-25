import React from "react"
import { graphql, Link } from "gatsby"
import { SEO } from '../components/SEO';
import { HeroTitle } from "../components/HeroTitle/HeroTitle";
import { ContentWrapper } from "../components/ContentWrapper";
import { Footer } from "../components/Footer";
import { GradientText } from "../components/GradientText";



/**
 * Запрос для получения списка тегов
 */
export const tagsQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC }}
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            title
          }
        }
      }
    }
  }
`

/**
 * Рендерим список тегов со ссылками на них
 */
export default function Tags({ pageContext, data }) {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} пост${
    totalCount === 1 ? "" : "ов"
  } c тегом`;

  const additionalPart = `"${tag}"`;

  return (
    <>
      <ContentWrapper>
        <HeroTitle>
          {tagHeader}
          <GradientText>{additionalPart}</GradientText>
        </HeroTitle>
        <div className='flex gap-2 mb-4'>
            <Link to='/' className='text-indigo-600'>{'Назад'}</Link>
            <Link to="/tags" className='text-indigo-600'>
              Все теги
            </Link>
        </div>
        <ul className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {edges.map(({ node }) => {
            const { slug, title } = node.fields
            return (
              <li key={slug}>
                <Link to={`/${slug}/`}>{title}</Link>
              </li>
            )
          })}
        </ul>
      </ContentWrapper>
      <Footer />
    </>
  )
}

export const Head = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} пост${
    totalCount === 1 ? "" : "ов"
  } c тегом`;

  const additionalPart = `"${tag}"`;

  const title = `${tagHeader} ${additionalPart}`;
  return (
    <SEO title={title} description={`Сортировка постов по тегам, тег ${additionalPart}`} />
  );
}
