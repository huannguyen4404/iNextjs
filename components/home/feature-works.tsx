import { Work } from '@/models'
import { Box, Container, Typography } from '@mui/material'
import { WorkList } from '../work'

export function FeatureWorks() {
  const workList: Work[] = [
    {
      id: '1',
      title: 'Designing Dashboard',
      createdAt: '1648363391671',
      updatedAt: '1648363391671',
      tagList: ['Dashboard'],
      shortDescription:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eaque mollitia accusamus debitis consequatur praesentium laborum deserunt ab ullam inventore eligendi laudantium ipsam assumenda alias non voluptate sed, veniam pariatur?',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/dqn5e9sdo/image/upload/v1683351551/iNextjs/item01_rhzhyh.jpg',
    },
    {
      id: '2',
      title: 'Vibrant Portraits of 2020',
      createdAt: '1648363391671',
      updatedAt: '1648363391671',
      tagList: ['Illustration'],
      shortDescription:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur quo consequatur, harum a praesentium soluta voluptatem, necessitatibus ut nam, aspernatur quidem! Illo magnam amet, quod molestiae reiciendis pariatur debitis est.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/dqn5e9sdo/image/upload/v1683351551/iNextjs/item02_ocxely.jpg',
    },
    {
      id: '3',
      title: '30 Days of Malayalam type',
      createdAt: '1648363391671',
      updatedAt: '1648363391671',
      tagList: ['Typography'],
      shortDescription:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur quo consequatur, harum a praesentium soluta voluptatem, necessitatibus ut nam, aspernatur quidem! Illo magnam amet, quod molestiae reiciendis pariatur debitis est.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/dqn5e9sdo/image/upload/v1683351551/iNextjs/item03_ylsx4q.jpg',
    },
  ]

  return (
    <Box component="section" pt={2} pb={4}>
      <Container>
        <Typography variant="h5" mb={4}>
          Feature Works
        </Typography>

        <WorkList workList={workList} />
      </Container>
    </Box>
  )
}
