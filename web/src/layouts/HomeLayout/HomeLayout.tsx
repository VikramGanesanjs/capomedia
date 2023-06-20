import { Box, Button, Divider, Typography, useTheme } from '@mui/material'
import { Toaster } from 'react-hot-toast'

import { navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Logo from 'src/components/Logo/Logo'
import MenuDrawer from 'src/components/MenuDrawer/MenuDrawer'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()

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
        <Button
          onClick={() => navigate(routes.home())}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h1"
            color="#000000"
            sx={{ display: { xs: 'none', xl: 'block' } }}
          >
            CAPOmedia
          </Typography>
        </Button>
        <Button
          onClick={() => navigate(routes.about())}
          sx={{ display: { xs: 'none', xl: 'block' } }}
          variant="contained"
        >
          About
        </Button>
        <Button
          onClick={() => navigate(routes.theater())}
          sx={{ display: { xs: 'none', xl: 'block' } }}
          variant="contained"
        >
          Theater
        </Button>
        <Button
          onClick={() => navigate(routes.contact())}
          sx={{ display: { xs: 'none', xl: 'block' } }}
          variant="contained"
        >
          Contact Us
        </Button>
        {isAuthenticated && (hasRole('student') || hasRole('admin')) && (
          <Button
            sx={{ display: { xs: 'none', xl: 'block' } }}
            onClick={() => navigate(routes.checkout())}
            variant="contained"
          >
            Checkout
          </Button>
        )}
        {isAuthenticated && hasRole('admin') && (
          <Button
            onClick={() => navigate(routes.admin())}
            variant="contained"
            sx={{ display: { xs: 'none', xl: 'block' } }}
          >
            Admin
          </Button>
        )}
        {isAuthenticated ? (
          <Button
            onClick={logOut}
            variant="contained"
            sx={{ display: { xs: 'none', xl: 'block' } }}
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => navigate(routes.login())}
            variant="contained"
            sx={{ display: { xs: 'none', xl: 'block' } }}
          >
            Login
          </Button>
        )}

        {isAuthenticated && (
          <Typography sx={{ display: { xs: 'none', md: 'block' } }}>{`Hello ${
            currentUser.name.split(' ')[0]
          }!`}</Typography>
        )}
        <Toaster />
        <MenuDrawer sx={{ display: { lg: 'block', xl: 'none' } }} />
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
