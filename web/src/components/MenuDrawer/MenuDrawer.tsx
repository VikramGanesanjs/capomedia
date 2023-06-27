import React, { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Button, Drawer } from '@mui/material'

import { navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import Logo from '../Logo/Logo'

const MenuDrawer = ({ sx, color }) => {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, hasRole, logOut } = useAuth()

  const logOutAndHome = () => {
    logOut()
    navigate(routes.home())
  }

  return (
    <Box sx={sx}>
      <Button onClick={() => setOpen(!open)}>
        <MenuIcon />
      </Button>
      <Drawer
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
        open={open}
        anchor="right"
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            bgcolor: color,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button onClick={() => navigate(routes.home())}>
            <Logo sx={{}} />
          </Button>
          <Button onClick={() => navigate(routes.about())}>About Us</Button>
          <Button onClick={() => navigate(routes.theater())}>Theater</Button>
          {isAuthenticated ? (
            <Button onClick={logOutAndHome}>Logout</Button>
          ) : (
            <Button onClick={() => navigate(routes.login())}>Login</Button>
          )}

          <Button onClick={() => navigate(routes.contact())}>Contact Us</Button>
          {isAuthenticated && (hasRole('student') || hasRole('admin')) && (
            <Button onClick={() => navigate(routes.checkout())}>
              Checkout
            </Button>
          )}
          {isAuthenticated && hasRole('admin') && (
            <Button onClick={() => navigate(routes.admin())}>Admin</Button>
          )}
          <Button onClick={() => setOpen(false)}>
            <CloseIcon />
          </Button>
        </Box>
      </Drawer>
    </Box>
  )
}

export default MenuDrawer
