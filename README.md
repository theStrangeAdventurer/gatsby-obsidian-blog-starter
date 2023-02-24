<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
# Gatsby's Obsidian blog starter

## Example
An example of a blog that works on this code base can be viewed [here](https://thestrangeadventurer.com). By the way, I post my notes there, in particular there is a series of articles about creating my blog. If you are wondering how to create your blog from scratch.

## Quick start

- Create symbol link from your Obsidian vault to `./content` folder:
```sh
ln -s /path/to/obsidian/vault/folder/ ./content/
```
After that , in `./content` directory will appear `your_vault_folder_name` directory with your md articles. More precisely, a link to this directory

- Replace all `/content/knowledgebase` to `/content/your_vault_folder_name`

- `cp .env.examlpe .env` and change METRIKA_TRACKING_ID to real traking id or remove value if you don't need Yandex Metrika in your blog

- `npm run dev` 

## Markdown requirements
All posts should have some [frontmatter](https://jekyllrb.com/docs/front-matter/) fields, below you can see an example:
```markdown
---
date: DD-MM-YYYY
stage: one of inProgress, readyToPublish and finished
---
```
If you want to change date format you should to apply the changes as well in [`gatsby-node.js`](./gatsby-node.js)
Posts which have stage `inProgress` will not participate with the build and will not be displayed on site

## DEPLOY
It is assumed,that you already have ssh connection to your remote server. Also you should specify three variables in `.env` file

```sh
DEPLOY_USER=user
DEPLOY_HOST=host
DEPLOY_PATH=/path/to/remove/server/folder
```

After that you can deploy your blog via scp, by run script `npm run deploy` (this is simple js wrapper around scp)
