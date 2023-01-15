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
      siteUrl: 'https://thestrangeadventurer.com',
      twitterUsername: '@the_strange_dev',
    },
    title: 'Блог беспечного авантюриста',
    description: 'Яндексойд, путешественник, авантюрист, беспечный и непредсказуемый. Люблю путешествовать, писать и делиться своими историями. Все мои путешествия и истории о них вы можете найти здесь (шутка, тут только про код).',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      plugins: [
        {
          resolve: `gatsby-remark-images`,
        }
      ],
      options: {
        name: `images`,
        path: `${__dirname}/content/knowledgebase/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/knowledgebase`,
        name: `blog`,
        ignore: [`**/\.obsidian`, `**/images`]
      },
    },
    {
        resolve: "gatsby-transformer-remark",
        options: {
            plugins: [
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
            ]
        }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-image',
  ],
}
