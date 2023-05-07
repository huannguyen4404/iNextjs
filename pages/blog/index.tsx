import { PostItem } from '@/components/blog'
import { MainLayout } from '@/components/layout'
import { Post } from '@/models'
import { MDManager } from '@/services/md-manager'
import { Box, Container, Divider } from '@mui/material'
import { GetStaticProps } from 'next'
import Link from 'next/link'

export interface BlogPageProps {
  posts: Post[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <Box>
      <Container>
        <h1>Blog</h1>
        <Box component="ul" sx={{ listStyleType: 'none', p: 0 }}>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <PostItem post={post} />
              </Link>

              <Divider sx={{ my: 3 }} />
            </li>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

BlogPage.Layout = MainLayout

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const postList = await MDManager.getAllPosts()

  return {
    props: {
      posts: postList,
    },
  }
}
