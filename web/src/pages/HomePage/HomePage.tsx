import { Box, Typography } from '@mui/material'

import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        p: 2,
        flexDirection: 'column',
      }}
    >
      <MetaTags title="Home" description="Home page" />
      <Typography>Latest Episode:</Typography>
    </Box>
  )
}

export default HomePage
