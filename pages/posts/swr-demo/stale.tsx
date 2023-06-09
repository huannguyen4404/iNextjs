import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'

export interface DemoStalePageProps {
  query: any
  post: any
}

export default function DemoStalePage({ query, post }: DemoStalePageProps) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((x) => {
        if (x > 60) clearInterval(intervalId)

        return x + 1
      })
    }, 1000)
  }, [])

  return (
    <div>
      <h1>Params Page</h1>

      <p>Time: {seconds}s</p>

      <h2>Post detail</h2>
      <p>{post?.title}</p>
      <p>{post?.author}</p>
      <p>{post?.description}</p>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')

  // fake call API 3s
  await new Promise((res) => setTimeout(res, 3000))

  const postId = context.query.postId
  if (!postId)
    return {
      props: { query: context.query },
    }

  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
  const data = await response.json()
  return {
    props: {
      query: context.query,
      post: data,
    },
  }
}
