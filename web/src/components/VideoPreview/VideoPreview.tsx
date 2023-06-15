import { Box, Grid, Typography, useTheme, Button } from '@mui/material'

import { navigate, routes } from '@redwoodjs/router'

interface Props {
  url: string
  title: string
  description: string
  id: number
}

const VideoPreview = ({ url, title, description, id }: Props) => {
  const theme = useTheme()

  // Regex to select vimeo id from url
  const expr = /(\d+)/g

  const vimeoId = url.match(expr)

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Button
            onClick={() => navigate(routes.video({ id: id }))}
            sx={{
              bgcolor: theme.palette.primary.main,
              p: 0.4,
            }}
          >
            <img
              style={{
                objectFit: 'cover',
                borderColor: theme.palette.primary.main,
                borderWidth: 'medium',
              }}
              height={180}
              width={300}
              alt="thumbnail"
              src={`https://vumbnail.com/${vimeoId}.jpg`}
            />
          </Button>
        </Box>
        <Typography variant="h6" style={{ color: 'white' }}>
          {title}
        </Typography>
        <Typography style={{ color: 'white' }}>{description}</Typography>
      </Box>
    </Grid>
  )
}

export default VideoPreview
