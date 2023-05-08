import { Box, Button, Divider, Typography, useTheme } from '@mui/material'

import { navigate, routes } from '@redwoodjs/router'

import Logo from 'src/components/Logo/Logo'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'auto',
        p: 0,
        m: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 5,
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <Logo />
        <Button onClick={() => navigate(routes.home())}>
          <Typography variant="h1" color="#000000">
            CAPOmedia
          </Typography>
        </Button>
        <Button onClick={() => navigate(routes.about())} variant="contained">
          About
        </Button>
        <Button onClick={() => navigate(routes.theater())} variant="contained">
          Theater
        </Button>
        <Button onClick={() => navigate(routes.contact())} variant="contained">
          Contact Us
        </Button>
        <Button onClick={() => navigate(routes.login())} variant="contained">
          Login
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 0,
        }}
      >
        <Divider
          sx={{
            height: 5,
            width: '33vw',
            backgroundColor: theme.palette.primary.main,
          }}
        />
        <Divider
          sx={{
            height: 5,
            width: '33vw',
            backgroundColor: theme.palette.secondary.main,
          }}
        />
        <Divider
          sx={{
            height: 5,
            width: '33vw',
            backgroundColor: theme.palette.secondary.dark,
          }}
        />
      </Box>
      {children}
    </Box>
  )
}

export default HomeLayout
