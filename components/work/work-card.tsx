import { Work } from '@/models'
import { Box, Chip, Stack, Typography } from '@mui/material'
import Image from "next/image"

export interface WorkCardProps {
  work: Work
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Box width={{ xs: '100%', sm: '246px' }} flexShrink={0}>
        <Image
          src={work.thumbUrl}
          width={246}
          height={180}
          alt="work thumbnal"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto"
          }} />
      </Box>

      <Box>
        <Typography variant="h4" fontWeight="bold">
          {work.title}
        </Typography>

        <Stack direction="row" my={2}>
          <Chip
            color="secondary"
            label={new Date(Number.parseInt(work.createdAt)).getFullYear()}
            size="small"
          />
          <Typography ml={3} color="GrayText">
            {work.tagList.join(', ')}
          </Typography>
        </Stack>

        <Typography>{work.shortDescription}</Typography>
      </Box>
    </Stack>
  );
}
