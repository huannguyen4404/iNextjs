import Header from '@/components/common/header'
import { GetStaticProps } from 'next'
// import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// I want it render from client side ONLY:
// const Header = dynamic(() => import('@/components/common/header'), { ssr: false })

export interface AboutProps {}

export default function About(props: AboutProps) {
  const [postList, setPostList] = useState([])
  const router = useRouter()

  console.log('About query: ', router.query)
  const page = router.query?.page

  function handleNextClick() {
    router.push(
      {
        pathname: '/about',
        query: {
          page: Number(page || 1) + 1,
        },
      },
      undefined,
      { shallow: true } // I don't want to trigger server side getStaticProps when url update
    )
  }

  useEffect(() => {
    if (!page) return
    ;(async () => {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
      const data = await response.json()

      setPostList(data.data)
    })()
  }, [page])

  return (
    <div>
      <h1>About Page</h1>

      <Header />

      <ul className="post-list">
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button onClick={handleNextClick}>Next page</button>
    </div>
  )
}

export async function getStaticProps() {
  console.log('get static props')

  return {
    props: {},
  }
}

// with this one, this page will be SSR
// export async function getServerSideProps() {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
