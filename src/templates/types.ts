export interface RelatedPost {
    excerpt: string
    frontmatter: Frontmatter
    id: string
    fields: Fields
    timeToRead: number
    htmlAst: any
}

export interface Frontmatter {
    github: string
    tags: string[]
}

export interface Fields {
    slug: string
    title: string
    stage: string
    seoDescription: string
}