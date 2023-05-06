import { FeatureWorks, HeroSection, RecentPosts } from '@/components/home'
import { MainLayout } from '@/components/layout'
import { Box } from '@mui/material'
import { NextPageWithLayout } from '../models'
import { MetaSeo } from '@/components/common'

const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <MetaSeo
        data={{
          title: 'iNextJS - Learn NextJS basic',
          description: 'Learning and doing a tiny site for demo with nextjs.',
          url: 'https://i-nextjs.vercel.app/',
          thumbnailUrl:
            'https://res.cloudinary.com/dqn5e9sdo/image/upload/v1683386219/iNextjs/happy_jnn5iy.png',
        }}
      />

      <HeroSection />

      <RecentPosts />

      <FeatureWorks />
    </Box>
  )
}

Home.Layout = MainLayout

export default Home
