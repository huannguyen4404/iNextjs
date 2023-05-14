import { Post } from '@/models'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify/lib'
import remarkParse from 'remark-parse/lib'
import remarkPrism from 'remark-prism'
import remarkRehype from 'remark-rehype/lib'
import remarkToc from 'remark-toc'
import { unified } from 'unified'

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'contents')

export const MDManager = {
  async getAllPosts(): Promise<Post[]> {
    const fileNameList = fs.readdirSync(BLOG_CONTENT_PATH)

    const postList: Post[] = []
    for (const fileName of fileNameList) {
      const filePath = path.join(BLOG_CONTENT_PATH, fileName)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, excerpt, content } = matter(fileContent, {
        excerpt_separator: '<!-- truncate-->',
      })

      postList.push({
        id: fileName,
        slug: data.slug,
        thumbnailUrl: data.image || null,
        title: data.title,
        author: {
          name: data.author,
          title: data.author_title,
          profileUrl: data.author_url,
          avatarUrl: data.author_image_url,
        },
        tagList: data.tags,
        publishedDate: data.date,
        description: excerpt || '',
        mdContent: content,
      })
    }

    return postList
  },

  async parseToHtml(mdContent?: string): Promise<string> {
    const vFile = await unified()
      .use(remarkParse)
      .use(remarkToc, { heading: 'agenda.*' })
      .use(remarkPrism)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
      .use(rehypeDocument, { title: 'Post detail page' })
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(mdContent || '')

    return vFile.toString()
  },
}
