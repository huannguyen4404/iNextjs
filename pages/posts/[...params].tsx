import { useRouter } from 'next/router'
import * as React from 'react'

export interface ParamsPageProps {}

export default function PostParamsPage(props: ParamsPageProps) {
  const router = useRouter()

  return (
    <div>
      <h1>PostParams Page</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  )
}
