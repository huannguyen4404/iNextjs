import { EmptyLayout } from '@/components/layout'
import axiosClient from '@/services/axios-client'
import { createEmotionCache, theme } from '@/utils'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SWRConfig } from 'swr'
import { AppPropsWithLayout } from '../models'
import '../styles/globals.css'
import '../styles/prism.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  // console.log('App re-render')

  const Layout = Component.Layout ?? EmptyLayout

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />

        <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  )
}
export default MyApp
