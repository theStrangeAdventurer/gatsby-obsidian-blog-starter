const { filterPosts } = require('./utils/posts');
const slufify = require('slugify');
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    social: {
      twitter: 'https://twitter.com/the_strange_dev',
      github: 'https://github.com/theStrangeAdventurer?tab=repositories',
      twitterUsername: '@the_strange_dev',
      profileImage: '/logo.jpg'
    },
    siteUrl: 'https://thestrangeadventurer.com',
    title: 'Strange %adventurer%',
    description: 'Делюсь заметками и постами о фронтенде и не только. Надеюсь, ты найдешь здесь что-то полезное 😉',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return filterPosts(allMarkdownRemark.nodes).map(node => {
                const postUrl = `${site.siteMetadata.siteUrl}/${node.fields.slug}/`;
                return Object.assign({}, node.frontmatter, {
                  title: node.fields.title,
                  description: `${node.excerpt}\nТеги: ${(node.frontmatter.tags || []).join(',')}`,
                  date: node.frontmatter.date,
                  url: postUrl,
                  guid: postUrl,
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    fields { 
                      slug
                      title
                    }
                    frontmatter {
                      date
                      tags
                      stage
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "The Strange Adventurer's RSS Feed",
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-htaccess',
      options: {
          https: true,
          www: false,
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      /**
       * Options: https://www.gatsbyjs.com/plugins/gatsby-plugin-robots-txt/#options
       */
    },
    /**
     * NOTE: Fhis plugin only generates output when run in production mode!
     * To test your sitemap, run: gatsby build && gatsby serve
     */
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/knowledgebase`,
        name: `blog`,
        ignore: [`**/\.obsidian`, `**/Templates`]
      },
    },
    {
        resolve: "gatsby-transformer-remark",
        options: {
            plugins: [
                {
                  resolve: `gatsby-remark-prismjs`,
                  options: {
                    classPrefix: "language-",
                    aliases: { sh: "bash" }
                  }
                },
                'gatsby-remark-gifs',
                {
                  resolve: `gatsby-remark-images`,
                  options: {
                    maxWidth: 630,
                  },
                },
                {
                    resolve: 'gatsby-remark-obsidian',
                    options: {
                        titleToURL: (title) => `/${require('slugify')(title, { lower: true })}/`, // optional
                        markdownFolder: `${__dirname}/content/knowledgebase`, // optional
                        highlightClassName: 'highlight', // optional
                    },
                },
                {
                  resolve: "@idmyn/gatsby-remark-wiki-link",
                  options: {
                    pageResolver: (name) => {
                      return [name.replace(/ /g, '-').toLowerCase()]
                    },
                    hrefTemplate: (permalink) => {
                      return `/${slufify(permalink, { lower: true })}/`
                    }
                  }
                },
            ]
        }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-image',
  ],
}
