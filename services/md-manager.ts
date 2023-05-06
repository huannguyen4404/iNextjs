import { Post } from '@/models'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'blog')

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
}
