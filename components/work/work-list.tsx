import { Work } from '@/models'
import { Box, Divider, Typography } from '@mui/material'
import Image from 'next/image'
import { Fragment } from 'react'
import { WorkCard } from './work-card'
import { WorkSkeleton } from './work-skeleton'

export interface WorkListProps {
  workList: Work[]
  loading?: boolean
}

export function WorkList({ workList, loading }: WorkListProps) {
  if (loading)
    return (
      <Box>
        {Array.from({ length: 3 }).map((_, index) => (
          <Fragment key={index}>
            <WorkSkeleton />
            <Divider sx={{ my: 3 }} />
          </Fragment>
        ))}
      </Box>
    )

  if (workList.length === 0)
    return (
      <Box textAlign="center">
        <Image
          src={
            'https://res.cloudinary.com/dqn5e9sdo/image/upload/v1683559716/iNextjs/no-data_liu3mu_vvsix2.svg'
          }
          width={150}
          height={150}
          layout="fixed"
          alt="work thumbnal"
        />
        <Typography>No data</Typography>
      </Box>
    )

  return (
    <Box>
      {workList.map((work) => (
        <Fragment key={work.id}>
          <WorkCard work={work} />
          <Divider sx={{ my: 3 }} />
        </Fragment>
      ))}
    </Box>
  )
}
