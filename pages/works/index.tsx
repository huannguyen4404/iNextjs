import { MainLayout } from '@/components/layout'
import { WorkFilters, WorkList } from '@/components/work'
import { useWorkList } from '@/hooks/use-work-list'
import { ListParams, WorkFiltersPayload } from '@/models'
import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  const [filters, setFilters] = useState<Partial<ListParams>>({ _page: 1, _limit: 3 })
  const { data, isLoading } = useWorkList({ params: filters })

  const { _limit, _totalRows, _page } = data?.pagination || {}
  const totalPages = _totalRows ? Math.ceil(_totalRows / _limit) : 0

  function handlePageChange(event: ChangeEvent<unknown>, value: number): any {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _page: value,
    }))
  }

  function handleFiltersChange(newFilters: WorkFiltersPayload) {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _page: 1,
      title_like: newFilters.search,
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

        <WorkFilters onSubmit={handleFiltersChange} />
        <WorkList workList={data?.data || []} loading={isLoading} />

        {totalPages > 0 && (
          <Stack alignItems="center">
            <Pagination count={totalPages} page={_page} onChange={handlePageChange} />
          </Stack>
        )}
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
