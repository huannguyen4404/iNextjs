import avatar from '@/images/avatar.png'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'

export function HeroSection() {
  return (
    <Box component="section" pt={{ xs: 4, md: 18 }} pb={{ xs: 7, md: 9 }}>
      <Container>
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          textAlign={{ xs: 'center', md: 'left' }}
          spacing={8}
        >
          <Box>
            <Typography component="h1" variant="h3" fontWeight="bold" mb={{ xs: 3.5, md: 5 }}>
              Hi, I am Huan,
              <br /> Dev Cỏ
            </Typography>

            <Typography variant="body1" mb={{ xs: 3.5, md: 5 }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad provident, harum sint est
              voluptatem obcaecati nihil totam maiores molestias cumque nobis modi fuga! Accusamus
              debitis minus molestias repellendus quam animi?
            </Typography>

            <Button variant="contained" size="large">
              Download Resume
            </Button>
          </Box>

          <Box
            sx={{
              minWidth: '240px',
              boxShadow: '-5px 13px',
              color: 'secondary.light',
              borderRadius: '50%',
            }}
          >
            <Image src={avatar} layout="responsive" alt="avatar" />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
