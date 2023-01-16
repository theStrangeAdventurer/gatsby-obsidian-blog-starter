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
      siteUrl: 'https://thestrangeadventurer.com',
      twitterUsername: '@the_strange_dev',
      profileImage: '/profile.jpg'
    },
    title: 'Блог беспечного авантюриста',
    description: 'Путешественник, авантюрист, беспечный и&nbsp;непредсказуемый. Люблю путешествовать, писать и&nbsp;делиться своими историями. Все мои путешествия и&nbsp;истории о&nbsp;них вы&nbsp;можете найти здесь (шутка, тут только про код).',
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-source-filesystem`,
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
                      console.log('name', name);
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
