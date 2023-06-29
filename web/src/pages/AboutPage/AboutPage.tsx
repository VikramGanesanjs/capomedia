import { Box, Typography, useTheme } from '@mui/material'
import Fade from 'react-reveal/Fade'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  const theme = useTheme()
  return (
    <>
      <MetaTags title="About" description="About page" />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          p: 0,
          m: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            bgcolor: '#000000',
            alignItems: 'center',
            backgroundImage: `url(${`https://i.imgur.com/OpdZPZ2.jpg`})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            gap: { xs: 2, sm: 2, md: 4, lg: 8, xl: 16 },
            p: 4,
            m: 0,
          }}
        >
          <Fade left>
            <Typography color="white" variant="h1">
              About Us
            </Typography>
          </Fade>
          <Fade collapse bottom>
            <Box sx={{ p: 4 }}>
              <Typography
                color="white"
                variant="h2"
                bgcolor="#000000"
                sx={{
                  fontSize: {
                    xs: 28,
                    lg: theme.typography.h2.fontSize,
                  },
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
                accusantium deserunt? Possimus recusandae quas, non sapiente
                soluta itaque placeat vitae cupiditate libero, praesentium
                voluptatem ipsam sed dolorem? Laudantium, vitae laboriosam.
                Asperiores ab ratione doloremque id ut temporibus quas tenetur
                unde omnis nemo aliquid nulla laudantium delectus consequuntur
                hic voluptatum saepe similique illo veniam, tempore mollitia
                facilis. Officiis voluptatibus deleniti totam. Fugit non officia
                nisi sequi. Recusandae, quidem atque asperiores quis odit
                reprehenderit ratione, aliquam illo repellat consequuntur
                repudiandae ut sed, aut dolorum ipsam. Voluptatibus esse
                maiores, nesciunt quibusdam fugiat illum.
              </Typography>
            </Box>
          </Fade>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            bgcolor: '#000000',
            alignItems: 'center',
            backgroundImage: `url(${`https://i.imgur.com/hJIBn3D.jpg`})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            gap: { xs: 2, sm: 2, md: 4, lg: 8, xl: 16 },
            p: 4,
            m: 0,
          }}
        >
          <Fade left>
            <Typography color="white" variant="h1">
              Our Mission
            </Typography>
          </Fade>
          <Fade collapse bottom>
            <Box sx={{ p: 4 }}>
              <Typography
                color="white"
                sx={{
                  fontSize: {
                    xs: 28,
                    lg: theme.typography.h2.fontSize,
                  },
                }}
                bgcolor="#000000"
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
                saepe distinctio perspiciatis quos corporis iusto dignissimos,
                dolorem repellendus facilis eum incidunt eos impedit culpa? Vero
                debitis ex dolorem ut ab. Ipsam natus autem corrupti enim beatae
                et! Repellendus, modi suscipit. Placeat harum a recusandae
                mollitia voluptatum? Ipsam aut, fuga voluptates, commodi rem
                quam soluta libero totam officiis unde dolores cum? Repellendus,
                dicta quisquam in et quas aspernatur mollitia quis fuga iste
                dolorum dolore! Maiores debitis provident adipisci ipsa!
                Corrupti, quod itaque! Itaque ea consectetur at corporis dolorum
                adipisci eveniet voluptate.
              </Typography>
            </Box>
          </Fade>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            bgcolor: '#000000',
            alignItems: 'center',
            backgroundImage: `url(${`https://i.imgur.com/TjNxa31.jpg`})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            gap: { xs: 2, sm: 2, md: 4, lg: 8, xl: 16 },
            p: 2,
            m: 0,
          }}
        >
          <Fade left>
            <Typography variant="h1" color="white">
              More Info
            </Typography>
          </Fade>
          <Fade collapse bottom>
            <Box sx={{ p: 4 }}>
              <Typography
                color="white"
                variant="h2"
                bgcolor="#000000"
                sx={{
                  fontSize: {
                    xs: 28,
                    lg: theme.typography.h2.fontSize,
                  },
                }}
              >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Quisquam, animi! Eligendi recusandae provident vero hic quisquam
                sunt odit beatae officia ipsum laudantium voluptatem aspernatur,
                similique eos, culpa sed! Tempora, et? Perspiciatis,
                necessitatibus consequuntur, quos, odit tempore inventore iure
                asperiores placeat sit atque rerum deserunt. Harum nam
                accusantium nihil quibusdam iste, vel laborum magnam quos rem
                repellat, culpa cupiditate dolores voluptates. Nihil eos alias
                nemo asperiores numquam rem. Dolorem, quod delectus! Dignissimos
                soluta quod quis sunt deserunt sint, deleniti omnis optio,
                necessitatibus repudiandae recusandae praesentium repellendus
                eos quidem, sapiente fuga asperiores!
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Box>
    </>
  )
}

export default AboutPage
