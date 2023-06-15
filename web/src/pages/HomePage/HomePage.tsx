import { ArrowDownward } from '@mui/icons-material'
import { Box, Button, Typography, useTheme } from '@mui/material'
import ReactPlayer from 'react-player'

import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import HomePageCard from 'src/components/HomePageCard/HomePageCard'

const HomePage = () => {
  const theme = useTheme()

  const homePageCardContent = [
    {
      name: 'Theater',
      key: 0,
      description:
        'Watch our show, films made by students in our class, and other films which visually inspire us!',
      color: theme.palette.primary.main,
      route: routes.theater(),
    },
    {
      name: 'Contact Us',
      key: 1,
      description:
        'Contact us with any questions you have about the class, what we do, and how you can join. ',
      color: theme.palette.secondary.main,
      route: routes.contact(),
    },
    {
      name: 'About Us',
      key: 2,
      description:
        'Learn more about CAPOmedia, what we do, our goals, and frequently asked questions',
      color: theme.palette.secondary.dark,
      route: routes.about(),
    },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        bgcolor: '#ffffff',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 5,
        backgroundImage: `url(${'web/public/assets/IMG_3155.JPG'})`,
      }}
    >
      <MetaTags title="Home" description="Home page" />
      <Typography
        variant="h2"
        style={{
          textAlign: 'center',
        }}
      >
        Home of Capo.360 and tons of student created films!
      </Typography>
      <Typography variant="h4">Latest Episode:</Typography>
      <Box
        sx={{
          boxShadow: `30px 30px ${theme.palette.secondary.dark}`,
        }}
      >
        <Box
          sx={{
            boxShadow: `20px 20px ${theme.palette.secondary.main}`,
          }}
        >
          <ReactPlayer
            url="https://vimeo.com/823134357"
            controls={true}
            height="50vh"
            width="50vw"
            style={{
              border: '5px solid #000000',
              boxShadow: `10px 10px ${theme.palette.primary.main}`,
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          p: 4,
          justifyContent: 'right',
        }}
      >
        <Button variant="contained" onClick={() => window.scrollBy(0, 100)}>
          <ArrowDownward />
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: '100px',
          height: '90vh',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Typography variant="h1">MAKE IDEAS HAPPEN!</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 5,
          }}
        >
          {homePageCardContent.map((props) => (
            <HomePageCard key={props.key} {...props} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
