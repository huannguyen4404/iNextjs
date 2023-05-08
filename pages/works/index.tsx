import { MainLayout } from '@/components/layout'
import { useWorkList } from '@/hooks/use-work-list'
import { ListParams } from '@/models'
import { Box, Button } from '@mui/material'
import { useState } from 'react'

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  const [filters, setFilters] = useState<Partial<ListParams>>({ _page: 1, _limit: 10 })

  const { data, isLoading } = useWorkList({ params: filters })
  console.log({ data, isLoading })

  function handleNextClick() {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _page: (prevFilter?._page || 0) + 1,
    }))
  }

  return (
    <div>
      Works page
      <Box>
        <Button variant="contained" onClick={handleNextClick}>
          Next page
        </Button>
      </Box>
    </div>
  )
}

WorksPage.Layout = MainLayout

export async function getStaticProps() {
  return {
    props: {},
  }
}
