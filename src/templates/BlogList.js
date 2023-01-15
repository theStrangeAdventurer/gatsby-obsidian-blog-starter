import React from "react"
import { graphql, Link } from "gatsby"
import { Pagination } from "../components/Pagination";
import { UserInfo } from "../components/UserInfo";
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
        <div>
            <UserInfo />
            {edges.map(({ node }) => {
                const { slug, title } = node.fields;
                const { date } = node.frontmatter;
                return (
                    <div key={slug}>
                        <h2>
                            <Link to={`/${slug}/`}>{title}</Link>
                        </h2>
                        <p>{date}</p>
                    </div>
                )
            })}
            <Pagination pageContext={props.pageContext} />
        </div>
    )
}
