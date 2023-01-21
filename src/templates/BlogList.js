import React from "react"
import { graphql, Link } from "gatsby"
import { Pagination } from "../components/Pagination";
import { UserInfo } from "../components/UserInfo";
import { SEO } from '../components/SEO';

/**
 * Запрос для получения списка постов, отсортированных по дате
 * 
 * Так как Gatsby это фреймворк - он предоставляет нам определенный API
 * Если мы экспортируем из файла graphql запрос - то Gatsby автоматически
 * будет его выполнять во время сборки и передавать результат в компонент в props.data
 */
export const blogListQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: ASC }}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            title
          }
          frontmatter {
            title
            date
          }
          excerpt
        }
      }
    }
  }
`

/**
 * Рендерим список постов со ссылками на них
 */
export default function BlogList(props) {
    const { allMarkdownRemark } = props.data;
    const { edges } = allMarkdownRemark;

    return (
        <div className='container mx-auto px-4 mt-16 relative'>
            <UserInfo />
            <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
              {edges.map(({ node }) => {
                  const { slug, title } = node.fields;
                  const { date } = node.frontmatter;
                  return (
                      <div className="mb-4" key={slug}>
                          <h2 className="text-bold text-2xl">
                            <Link to={`/${slug}/`}>{title}</Link>
                          </h2>
                          <p className="text-gray-500">{node.excerpt}</p>
                          <span className="text-gray-300" >{date}</span>
                      </div>
                  )
              })}
            </div>
            <Pagination pageContext={props.pageContext} />
        </div>
    )
}

export const Head = () => (
  <SEO />
)
