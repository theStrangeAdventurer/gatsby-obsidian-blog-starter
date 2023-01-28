import React from "react"
import { graphql, Link } from "gatsby"
import { Pagination } from "../components/Pagination";
import { UserInfo } from "../components/UserInfo";
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';

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
      sort: { frontmatter: { date: DESC }}
      limit: $limit
      skip: $skip
      filter: {fields: {stage: {ne: "inProgress"}}}
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
            stage
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
        <>
          <div className='container mx-auto px-4 mt-16 relative'>
              <UserInfo />
              <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                {edges.map(({ node }) => {
                    const { slug, title } = node.fields;
                    const { date, stage } = node.frontmatter;
                    
                    return (
                        <div className="mb-4" key={slug}>
                            <h2 className="text-bold text-2xl">
                              <Link to={`/${slug}/`}>{title}</Link>
                            </h2>
                            <span className="text-gray-300" >{new Intl.DateTimeFormat('ru-Ru').format(new Date(date))}</span>
                            {stage === 'readyToPublish' &&
                              <span className="text-green-500 ml-2">Дополняется...</span>}
                            <p className="text-gray-500">{node.excerpt}</p>
                        </div>
                    )
                })}
              </div>
              <Pagination pageContext={props.pageContext} />
          </div>
          <Footer />
        </>
    )
}

export const Head = () => (
  <SEO />
)
