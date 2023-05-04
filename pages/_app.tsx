import { EmptyLayout } from '@/components/layout'
import { AppPropsWithLayout } from '../models'
import '../styles/globals.css'
import { SWRConfig } from 'swr'
import axiosClient from '@/services/axios-client'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  console.log('App re-render')

  const Layout = Component.Layout ?? EmptyLayout

  return (
    <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}
export default MyApp
