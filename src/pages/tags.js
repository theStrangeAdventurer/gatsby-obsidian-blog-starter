import React from "react"
import { Link, graphql } from "gatsby"
import { ContentWrapper } from "../components/ContentWrapper"
import { HeroTitle } from "../components/HeroTitle/HeroTitle"
import { Footer } from "../components/Footer"
import { Tags } from "../components/Tags"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group }
  },
}) => {

  const tags = group.map(tag => ({
    value: tag.fieldValue,
    title: `Перейти к постам с тегом ${tag.fieldValue}, всего постов - ${tag.totalCount}`,
  }));

  return (
    <>
      <ContentWrapper>
          <HeroTitle as="h1">
              Теги
          </HeroTitle>
          <div className='flex gap-2 mb-4'>
          <Link to='/' className='text-white px-4 py-2 bg-indigo-600 hover:bg-slate-900 hover:text-slate-100 rounded-lg'>{'Назад'}</Link>
          </div>
          <Tags tags={tags} />
      </ContentWrapper>
      <Footer />
    </>
  );
}

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