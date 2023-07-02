import { Box, Button, Grid, Paper, Typography } from '@mui/material'

import { routes, navigate } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

const GridItem = ({ children }) => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={4}
      sx={{
        ':hover': {
          transition: 'box-shadow 0.5s ease-in-out',
          boxShadow: 4, // theme.shadows[20]
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          p: 2,
          minHeight: { xs: '30vh', lg: '50vh' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
          flexDirection: 'column',
        }}
      >
        {children}
      </Paper>
    </Grid>
  )
}

const AdminPage = () => {
  const QUERY = gql`
    query FindProjects {
      bookings: currentBookings {
        projectName
        startTime
        directorName
        producerName
      }
    }
  `

  const { data, loading, error } = useQuery(QUERY, {
    onCompleted: (data) => {
      console.log(data)
    },
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 4,
        gap: 4,
      }}
    >
      <Typography variant="h4">Admin Dashboard</Typography>
      <Grid container spacing={2}>
        <GridItem>
          <Typography variant="h6" component="h6" sx={{ textAlign: 'center' }}>
            Add new equipment to the inventory system, edit current equipment
            and create new equipment categories
          </Typography>
          <Button onClick={() => navigate(routes.equipments())}>
            {' '}
            Go to equipment manager
          </Button>
        </GridItem>
        <GridItem>
          <Typography variant="h6" component="h6" sx={{ textAlign: 'center' }}>
            Approve or reject pending equipment bookings
          </Typography>
          <Button onClick={() => navigate(routes.bookingApproval())}>
            {' '}
            Go to booking manager
          </Button>
        </GridItem>
        <GridItem>
          <Typography variant="h6" component="h6" sx={{ textAlign: 'center' }}>
            Projects currently in production:
          </Typography>
          {loading ? (
            <Typography> Loading...</Typography>
          ) : error ? (
            <Typography>{error.message}</Typography>
          ) : data.bookings.length === 0 ? (
            <Typography>No projects</Typography>
          ) : (
            data.bookings.map((booking, i) => {
              if (new Date(booking.startTime) > new Date()) {
                return (
                  <Typography key={i}>
                    {`${booking.projectName} - Directed By ${booking.directorName} - Produced By ${booking.producerName}`}
                  </Typography>
                )
              }
            })
          )}
          <Button onClick={() => navigate(routes.bookings())}>
            {' '}
            View all bookings
          </Button>
        </GridItem>
        <GridItem>
          <Typography variant="h6" component="h6" sx={{ textAlign: 'center' }}>
            View responses to the contact form
          </Typography>
          <Button onClick={() => navigate(routes.contactFormResponses())}>
            {' '}
            Go to Contact Response List
          </Button>
        </GridItem>
        <GridItem>
          <Typography variant="h6" component="h6" sx={{ textAlign: 'center' }}>
            Add, edit, and delete videos from the video theater
          </Typography>
          <Button onClick={() => navigate(routes.videos())}>
            {' '}
            Go to Video Manager
          </Button>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default AdminPage
