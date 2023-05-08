import { QueryKeys } from '@/constants'
import { ListParams } from '@/models'
import { WorkMS } from '@/services'
import useSWR, { SWRConfiguration } from 'swr'

export interface useWorkListProps {
  params: Partial<ListParams>
  options?: SWRConfiguration
}

export function useWorkList({ params, options }: useWorkListProps) {
  const swrResponse = useSWR([QueryKeys.GET_WORK_LIST, params], () => WorkMS.getAll(params), {
    dedupingInterval: 30 * 1000, // 30s
    keepPreviousData: true,
    fallbackData: {
      data: [],
      pagination: { _page: 1, _limit: 10, _totalRows: 0 },
    },
    ...options,
  })

  return swrResponse
}
