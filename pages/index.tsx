import { HeroSection, RecentPost } from '@/components/home'
import { MainLayout } from '@/components/layout'
import { Box } from '@mui/material'
import { NextPageWithLayout } from '../models'

const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <HeroSection />

      <RecentPost />
    </Box>
  )
}

Home.Layout = MainLayout

export default Home
