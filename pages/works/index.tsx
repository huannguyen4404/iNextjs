import { MainLayout } from '@/components/layout'
import { WorkList } from '@/components/work'
import { useWorkList } from '@/hooks/use-work-list'
import { ListParams } from '@/models'
import { Box, Button, Container, LinearProgress, Typography } from '@mui/material'
import { useState } from 'react'

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  const [filters, setFilters] = useState<Partial<ListParams>>({ _page: 1, _limit: 3 })

  const { data, isLoading } = useWorkList({ params: filters })
  console.log({ data, isLoading })

  function handlePrevClick() {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _page: (prevFilter?._page || 0) - 1,
    }))
  }

  function handleNextClick() {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _page: (prevFilter?._page || 0) + 1,
    }))
  }

  return (
    <Box>
      <Container>
        <Box mb={4} mt={6}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
        </Box>

        {isLoading ? <LinearProgress /> : <WorkList workList={data?.data || []} />}

        <Box>
          <Button variant="contained" onClick={handlePrevClick}>
            Prev page
          </Button>

          <Button variant="contained" onClick={handleNextClick}>
            Next page
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

WorksPage.Layout = MainLayout

export async function getStaticProps() {
  return {
    props: {},
  }
}
