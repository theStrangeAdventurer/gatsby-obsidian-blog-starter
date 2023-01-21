import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
      query {
        site {
          siteMetadata {
            description
            siteUrl
            title
            social {
              github
              profileImage
              twitter
              twitterUsername
            }
          }
        }
      }
    `)
    return data.site.siteMetadata
}