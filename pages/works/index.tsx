import { MainLayout } from '@/components/layout'
import { WorkFilters, WorkList } from '@/components/work'
import { useWorkList } from '@/hooks/use-work-list'
import { ListParams, WorkFiltersPayload } from '@/models'
import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  const router = useRouter()

  const filters: Partial<ListParams> = {
    _page: 1,
    _limit: 3,
    ...router.query,
  }

  const initFiltersPayload: WorkFiltersPayload = {
    search: filters.title_like || '',
  }

  const { data, isLoading } = useWorkList({ params: filters, enable: router.isReady })

  const { _limit, _totalRows, _page } = data?.pagination || {}
  const totalPages = _totalRows ? Math.ceil(_totalRows / _limit) : 0

  function handlePageChange(event: ChangeEvent<unknown>, value: number): any {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: value,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  function handleFiltersChange(newFilters: WorkFiltersPayload) {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: 1,
          title_like: newFilters.search,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <Box>
      <Container>
        <Box mb={4} mt={6}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
        </Box>

        {router.isReady && (
          <WorkFilters initialValues={initFiltersPayload} onSubmit={handleFiltersChange} />
        )}
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
