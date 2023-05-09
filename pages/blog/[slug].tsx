import { MetaSeo } from '@/components/common'
import { MainLayout } from '@/components/layout'
import { Post } from '@/models'
import { MDManager } from '@/services/md-manager'
import { Box, Container } from '@mui/material'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import Script from 'next/script'

export interface SinglePostPageProps {
  post: Post
}

export default function SinglePostPage({ post }: SinglePostPageProps) {
  const router = useRouter()

  if (!post) return null

  return (
    <Box>
      <MetaSeo
        data={{
          title: `${post.title}`,
          description: post.description,
          url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/blog/${post.slug}`,
          thumbnailUrl:
            post.thumbnailUrl ||
            'https://res.cloudinary.com/dqn5e9sdo/image/upload/v1683386219/iNextjs/happy_jnn5iy.png',
        }}
      />

      <Container>
        <p>{post.title}</p>
        <p>{post.author?.name}</p>

        <div dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}></div>
      </Container>

      <Script src="/prism.js" strategy="afterInteractive"></Script>
    </Box>
  )
}

SinglePostPage.Layout = MainLayout

export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await MDManager.getAllPosts()

  return {
    paths: postList.map((post: Post) => ({ params: { slug: post.slug } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<SinglePostPageProps> = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug
  if (!slug) return { notFound: true }

  const postList = await MDManager.getAllPosts()
  const post = postList.find((post) => post.slug === slug)
  if (!post) return { notFound: true }

  post.htmlContent = await MDManager.parseToHtml(post.mdContent)

  return {
    props: {
      post,
    },
  }
}
