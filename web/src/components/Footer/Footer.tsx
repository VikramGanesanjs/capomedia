import React from 'react'

import {
  Box,
  Typography,
  Button,
  useTheme,
  Grid,
  Link,
  Divider,
} from '@mui/material'
import Fade from 'react-reveal/Fade'
import { SocialIcon } from 'react-social-icons'

import { navigate, routes } from '@redwoodjs/router'

import Logo from '../Logo/Logo'

const PageLink = ({ routeName, pageName }) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={2}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Button onClick={() => navigate(routes[routeName]())}>
        <Typography variant="h2" textAlign="center">
          {pageName}
        </Typography>
      </Button>
    </Grid>
  )
}

function SocialIcons() {
  const styleSmall =
    window.innerWidth < 900
      ? {
          height: '2rem',
          width: '2rem',
        }
      : {
          height: '2.5rem',
          width: '2.5rem',
        }

  return (
    <Box>
      <Grid container>
        <Grid item xs>
          <Box p={1}>
            <SocialIcon
              url="https://www.instagram.com/capomedia/?hl=en"
              bgColor="#565656"
              style={styleSmall}
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box p={1}>
            <SocialIcon
              url="https://vimeo.com/user3307290"
              bgColor="#565656"
              style={styleSmall}
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box p={1}>
            <SocialIcon
              url="https://www.tiktok.com/@capomedia"
              bgColor="#565656"
              style={styleSmall}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

function Footer() {
  const theme = useTheme()

  const pages = [
    { routeName: 'home', pageName: 'Home' },
    { routeName: 'about', pageName: 'About' },
    { routeName: 'contact', pageName: 'Contact' },
    { routeName: 'theater', pageName: 'Theater' },
  ]

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.light,
        flexDirection: 'column',
        display: 'flex',
        gap: 2,
        alignItems: { xs: 'center', lg: 'normal' },
        justifyContent: { xs: 'center', lg: 'normal' },
      }}
    >
      <Box
        sx={{
          flexDirection: 'row',
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Fade left>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Button onClick={() => navigate(routes.home())}>
              <Logo sx={{}} />
            </Button>
            <Typography
              variant="h1"
              sx={{ display: { xs: 'none', lg: 'block' } }}
            >
              CAPOmedia
            </Typography>
          </Box>
        </Fade>
        <Fade collapse bottom>
          <SocialIcons />
        </Fade>
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
            width: '34vw',
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 2,
          justifyContent: 'space-between',
        }}
      >
        <Fade collapse bottom>
          <Typography>
            &#169; Copyright 2023 CAPOmedia. All Rights Reserved
          </Typography>
        </Fade>
      </Box>
    </Box>
  )
}
export default Footer
