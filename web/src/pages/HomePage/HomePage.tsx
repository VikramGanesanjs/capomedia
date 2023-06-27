import { Box, Button, Typography, useTheme } from '@mui/material'
import ReactPlayer from 'react-player'
import Fade from 'react-reveal/Fade'
import Reveal from 'react-reveal/Reveal'
import Zoom from 'react-reveal/Zoom'

import { navigate, routes } from '@redwoodjs/router'
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
        bgcolor: '#ffffff',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      <MetaTags title="Home" description="Home page" />
      <Box
        sx={{
          backgroundImage: `url(${`https://i.imgur.com/vClnG36.jpg`})`,
          p: 2,
          m: 0,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100%',
          alignItems: 'center',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        <Fade left>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: 80, sm: 100, md: 120 },
              color: '#ffffff',
              backgroundColor: '#000000',
            }}
          >
            CAPOmedia
          </Typography>
        </Fade>
        <Fade left>
          <Typography
            variant="h2"
            style={{
              textAlign: 'center',
              color: '#ffffff',
              backgroundColor: '#000000',
            }}
          >
            Home of Capo.360 and tons of student created films!
          </Typography>
        </Fade>
        <Fade collapse bottom>
          <Box
            sx={{
              border: '2px solid #ffffff',
              ':hover': { border: '2px solid #000000', bgcolor: '#ffffff' },
              bgcolor: '#000000',
            }}
          >
            <Button
              sx={{
                bgcolor: '#000000',
                color: '#ffffff',
                ':hover': { bgcolor: '#ffffff', color: '#000000' },
              }}
              onClick={() => navigate(routes.about())}
            >
              <Typography variant="h2">Learn More</Typography>
            </Button>
          </Box>
        </Fade>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          p: 2,
          pt: 20,
          gap: 8,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#000000',
          alignItems: 'center',
        }}
      >
        <Fade left>
          <Typography variant="h4">Latest Episode:</Typography>
        </Fade>
        <Fade collapse bottom>
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
        </Fade>
        <Fade collapse bottom>
          <Box
            sx={{
              border: `2px solid ${theme.palette.primary.main}`,
              p: 2,
              mt: 4,
            }}
          >
            <Button onClick={() => navigate(routes.theater())}>
              <Typography variant="h4" sx={{ fontSize: 20 }}>
                Browse Our Theater
              </Typography>
            </Button>
          </Box>
        </Fade>
      </Box>

      <Box
        sx={{
          backgroundImage: `url(${`https://i.imgur.com/AhmHWkt.jpg`})`,
          p: 2,
          m: 0,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100%',
          alignItems: 'center',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        <Fade left>
          <Typography variant="h1" color="#ffffff">
            Make Ideas Happen!
          </Typography>
        </Fade>
        <Fade collapse bottom>
          <Typography variant="h2" color="#ffffff">
            Any Questions?
          </Typography>
        </Fade>
        <Fade collapse bottom>
          <Box
            sx={{
              border: '4px solid #000000',
              ':hover': { border: '4px solid #ffffff', bgcolor: '#000000' },
              bgcolor: '#ffffff',
            }}
          >
            <Button
              sx={{
                bgcolor: '#ffffff',
                color: '#000000',
                ':hover': { bgcolor: '#000000', color: '#ffffff' },
              }}
              onClick={() => navigate(routes.contact())}
            >
              <Typography variant="h2">Contact Us</Typography>
            </Button>
          </Box>
        </Fade>
      </Box>
    </Box>
  )
}

export default HomePage
