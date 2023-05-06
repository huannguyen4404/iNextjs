import { Post } from '@/models'
import { MDManager } from '@/services/md-manager'
import { GetStaticProps } from 'next'
import Link from 'next/link'

export interface BlogPageProps {
  posts: Post[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  console.log(posts)

  return (
    <div>
      <h1>Blog list page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const postList = await MDManager.getAllPosts()

  return {
    props: {
      posts: postList,
    },
  }
}
