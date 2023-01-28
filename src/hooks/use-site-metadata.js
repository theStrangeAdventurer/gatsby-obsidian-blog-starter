import { graphql, useStaticQuery } from "gatsby"

/**
 * 
 * @returns {{ description: string; title: string; siteUrl: string; social: { github: string; profileImage: string; twitter: string; twitterUsername: string; }}} siteMetadata
 */
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