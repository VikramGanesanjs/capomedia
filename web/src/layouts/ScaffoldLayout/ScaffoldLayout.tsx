import { Box, Button, Divider, Typography, useTheme } from '@mui/material'

import { Link, navigate, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import Logo from 'src/components/Logo/Logo'
import MenuDrawer from 'src/components/MenuDrawer/MenuDrawer'

type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
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
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1,
          bgcolor: theme.palette.primary.light,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Button onClick={() => navigate(routes.home())}>
            <Logo sx={{}} />
          </Button>
          <Box sx={{ display: { sm: 'none', xl: 'block' } }}>
            <h1 className="rw-heading rw-heading-primary">
              <Link to={routes['home']()} className="rw-link">
                <Typography variant="h1" color="#000000">
                  CAPOmedia
                </Typography>
              </Link>
            </h1>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Button onClick={() => navigate(routes[buttonTo]())}>
            <div className="rw-button-icon">+</div> {buttonLabel}
          </Button>

          <MenuDrawer sx={{}} color={theme.palette.primary.light} />
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
            width: '34vw',
            backgroundColor: theme.palette.secondary.dark,
          }}
        />
      </Box>
      <main className="rw-main">{children}</main>
    </Box>
  )
}

export default ScaffoldLayout
