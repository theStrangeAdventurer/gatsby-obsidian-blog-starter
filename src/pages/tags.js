import React from "react"

// Utilities
import kebabCase from "lodash/kebabCase"

import { Link, graphql } from "gatsby"
import { ContentWrapper } from "../components/ContentWrapper"
import { HeroTitle } from "../components/HeroTitle/HeroTitle"
import { Footer } from "../components/Footer"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group }
  },
}) => (
  <>
    <ContentWrapper>
        <HeroTitle as="h1">
            Теги
        </HeroTitle>
        <div className='flex gap-2 mb-4'>
            <Link to='/' className='text-indigo-600'>{'Назад'}</Link>
        </div>
        <ul itemScope itemType="http://schema.org/Blog" className="flex flex-wrap">
            {group.map(tag => (
            <li key={tag.fieldValue} itemProp="keywords" className="bg-slate-100 p-1 mr-3 mb-3 rounded-lg">
                <Link title={`Перейти к постам с тегом ${tag.fieldValue}, всего постов - ${tag.totalCount}`} to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
                </Link>
            </li>
            ))}
        </ul>
    </ContentWrapper>
    <Footer />
  </>
)

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT }}) {
        fieldValue
        totalCount
      }
    }
  }
`