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
          px: 3,
          pr: 4,
          justifyContent: 'space-between',
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Logo sx={{ display: 'block' }} />
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
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              CAPOmedia
            </Typography>
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Button
            onClick={() => navigate(routes.about())}
            sx={{ display: { xs: 'none', lg: 'block' } }}
          >
            About
          </Button>
          <Button
            onClick={() => navigate(routes.theater())}
            sx={{ display: { xs: 'none', lg: 'block' } }}
          >
            Theater
          </Button>
          <Button
            onClick={() => navigate(routes.contact())}
            sx={{ display: { xs: 'none', lg: 'block' } }}
          >
            Contact Us
          </Button>
          {isAuthenticated && (hasRole('student') || hasRole('admin')) && (
            <Button
              sx={{ display: { xs: 'none', lg: 'block' } }}
              onClick={() => navigate(routes.checkout())}
            >
              Checkout
            </Button>
          )}
          {isAuthenticated && hasRole('admin') && (
            <Button
              onClick={() => navigate(routes.admin())}
              sx={{ display: { xs: 'none', lg: 'block' } }}
            >
              Admin
            </Button>
          )}
          {isAuthenticated ? (
            <Button
              onClick={logOut}
              sx={{ display: { xs: 'none', lg: 'block' } }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate(routes.login())}
              sx={{ display: { xs: 'none', lg: 'block' } }}
            >
              Login
            </Button>
          )}

          {isAuthenticated && (
            <Typography
              sx={{ display: { xs: 'none', md: 'block' }, mt: 0.68 }}
            >{`Hello ${
              currentUser.name.indexOf(' ') >= 0
                ? currentUser.name.split(' ')[0]
                : currentUser.name
            }!`}</Typography>
          )}
          <Toaster />
          <MenuDrawer
            color={theme.palette.primary.light}
            sx={{ display: { md: 'block', lg: 'none' } }}
          />
        </Box>
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
