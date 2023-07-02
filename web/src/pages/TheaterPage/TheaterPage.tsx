import React, { useState } from 'react'

import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material'
import Fade from 'react-reveal/Fade'

import { MetaTags } from '@redwoodjs/web'

import FeaturedCell from 'src/components/FeaturedCell'
import MenuDrawer from 'src/components/MenuDrawer/MenuDrawer'
import VideoCategoryCell from 'src/components/VideoCategoryCell'

interface TabPanelProps {
  children?: JSX.Element
  index: number
  value: number
}

const TabPanel = ({ value, index, children }: TabPanelProps): JSX.Element => {
  if (value === index) {
    return children
  } else {
    return null
  }
}

const TheaterPage = () => {
  const [category, setCategory] = useState(0)
  const theme = useTheme()

  const categories = [
    'Featured',
    'Capo.360',
    'Short Film',
    'Spot Feature',
    'Independent',
    'Show Open',
  ]

  return (
    <>
      <MetaTags title="Theater" description="Theater page" />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: '#000000',
          overflow: 'auto',
          p: 0,
          m: 0,
        }}
      >
        <MenuDrawer
          sx={{ position: 'fixed', top: 10, right: 10 }}
          color={theme.palette.primary.light}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Fade left>
            <Typography variant="h1" color="white">
              Theater
            </Typography>
          </Fade>
          <Box>
            <Tabs
              value={category}
              onChange={(e, v) => setCategory(v)}
              variant="fullWidth"
              scrollButtons="auto"
              sx={{
                xs: { width: '80%' },
                color: 'primary.main',
                '& .MuiTabs-scroller': {
                  padding: theme.spacing(1),
                },
              }}
            >
              {categories.map((categoryAtI, i) => (
                <Tab
                  label={categoryAtI}
                  color="white"
                  sx={{
                    color: 'white',
                  }}
                  key={i}
                />
              ))}
            </Tabs>
          </Box>
          {categories.map((categoryAtI, i) => (
            <TabPanel value={category} index={i} key={i}>
              {categoryAtI == 'Featured' ? (
                <FeaturedCell />
              ) : (
                <VideoCategoryCell category={categoryAtI} />
              )}
            </TabPanel>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default TheaterPage
