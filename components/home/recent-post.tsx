import { Post } from '@/models'
import { Box, Container, Link as MuiLink, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { PostCard } from './post-card'

export function RecentPosts() {
  const postList: Post[] = [
    {
      id: '1',
      slug: 'making-a-design',
      title: 'Making a design system from scratch',
      publishedDate: '2022-06-18T12:00:00Z',
      tagList: ['Design', 'Pattern'],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eaque mollitia accusamus debitis consequatur praesentium laborum deserunt ab ullam inventore eligendi laudantium ipsam assumenda alias non voluptate sed, veniam pariatur?',
    },
    {
      id: '2',
      slug: 'create-pixel-perfect',
      title: 'Creating pixel perfect icons in Figma',
      publishedDate: '2022-06-18T12:00:00Z',
      tagList: ['Figma', 'Icon Design'],
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur quo consequatur, harum a praesentium soluta voluptatem, necessitatibus ut nam, aspernatur quidem! Illo magnam amet, quod molestiae reiciendis pariatur debitis est.',
    },
  ]

  return (
    <Box component="section" bgcolor="secondary.light" pt={2} pb={4}>
      <Container>
        <Stack
          direction="row"
          mb={2}
          justifyContent={{ xs: 'center', md: 'space-between' }}
          alignItems="center"
        >
          <Typography variant="h5">Recent Posts</Typography>

          <Link href="/blog" passHref legacyBehavior>
            <MuiLink sx={{ display: { xs: 'none', md: 'inline-block' } }}>View all</MuiLink>
          </Link>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{
            '& > div': {
              width: {
                xs: '100%',
                md: '50%',
              },
            },
          }}
        >
          {postList.map((post) => (
            <Box key={post.id}>
              <PostCard post={post} />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
