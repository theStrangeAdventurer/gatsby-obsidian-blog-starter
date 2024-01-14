const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const dotenv = require('dotenv');
const kebabCase = require('lodash/kebabcase');
/*
 * npm install slugify - пакет нужен чтобы превращать заголовки в слаги на латинице
 * Например "Привет мир" => "privet-mir"
 */ 
const slugify = require("slugify");

const envVars = dotenv.config().parsed;

const envKeys = Object.keys(envVars).reduce((acc, env) => {
  acc[`process.env.${env}`] = JSON.stringify(envVars[env]);
  return acc;
}, {}); // { SOME_ENV_VAR: '"SOME_VALUE"', ... }

exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
  actions.setWebpackConfig({
    plugins: [
      // Add the environment variables to webpack.DefinePlugin with define().
      plugins.define(envKeys)
    ]
  });
};

/**
 * Создаем поля slug и title для каждого поста
 * slug - это путь к посту, например /privet-mir
 * title - это заголовок поста, например "Привет мир"
 * Функция вызывается при создании каждого поста
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    if (node.frontmatter.date) {
      const [day, month, year] = node.frontmatter.date.split('-');
      const date = new Date(`${year}-${month}-${day}`).toISOString();
      node.frontmatter.date = date;
    }

    if (node.frontmatter.updated) {
      const [day, month, year] = node.frontmatter.updated.split('-');
      const date = new Date(`${year}-${month}-${day}`).toISOString();
      node.frontmatter.updated = date;
    }
    
    const value = createFilePath({ node, getNode });
    
    createNodeField({
      name: `seoDescription`,
      node,
      value: node.frontmatter.seoDescription || '',
    })

    createNodeField({
      name: `seoTitle`,
      node,
      value: node.frontmatter.seoTitle || '',
    })

    createNodeField({
      name: `stage`,
      node,
      value: node.frontmatter.stage,
    })

    createNodeField({
      name: `slug`,
      node,
      value: slugify(value, { lower: true }),
    })
    
    createNodeField({
      name: `title`,
      node,
      value: value.replace(/(^\/|\/$)/g, ''),
    })
  }
}

/**
 * Создаем все необходимые страницы на основе файлов
 * которые лежат в папке src/templates
 */
exports.createPages = async function ({ actions, graphql }) {
  /**
   * Получаем слаги, которые необходимы
   * чтобы построить ссылки на все посты
   * и понять сколько будет всего страниц
   */
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              stage
              title
              seoDescription
              seoTitle
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT }}) {
          fieldValue
        }
      }
    }
  `)

  const tags = data.tagsGroup.group;

  /**
   * Создаем страницу для каждого тега
   * в качестве компонента, который будет отвечать за рендеринг
   * указываем src/templates/Tags.js
   */
  tags.forEach(({ fieldValue }) => {
    actions.createPage({
      path: `/tags/${kebabCase(fieldValue)}/`,
      component: path.resolve(process.cwd(), `src/templates/Tags.js`),
      context: {
        tag: fieldValue,
      },
    })
  });

  const posts = data.allMarkdownRemark.edges
    .filter(({ node }) => {
      return node.fields.stage && !(node.fields.stage || '').includes('inProgress')
    });

  const POSTS_PER_PAGE = 8 // Определяем сколько постов будет на одной странице
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE) // Считаем сколько всего страниц

  /**
   * Создаем страницу для каждого поста
   * в качестве компонента, который будет отвечать за рендеринг
   * указываем src/templates/BlogPost.js
   */
  posts.forEach((edge) => {
    const { slug, title, stage, seoDescription, seoTitle  } = edge.node.fields

    actions.createPage({
      path: slug,
      component: path.resolve(process.cwd(), `src/templates/BlogPost.js`),
      context: { slug, title, stage, seoDescription, seoTitle },
    })
  })

  /**
   * Создаем страницы для пагинации
   * если страница 1, то путь будет /
   * если страница 2, то путь будет /page/2 и т.д.
   * в качестве компонента, который будет отвечать за рендеринг
   * указываем src/templates/BlogList.js
   */
  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: path.resolve(process.cwd(), `src/templates/BlogList.js`),
      /**
       * Передаем в контекст данные для построения пагинации
       */
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages,
        currentPage: i + 1,
      },
    })
  })

}
