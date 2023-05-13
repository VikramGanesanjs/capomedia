import { Button, Card, Divider, Typography } from '@mui/material'

import { navigate } from '@redwoodjs/router'

interface HomePageCardProps {
  description: string
  name: string
  color: string
  route: any
}

const HomePageCard = ({
  description,
  name,
  color,
  route,
}: HomePageCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: color,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '30%',
        p: 2,
        gap: 5,
      }}
    >
      <Typography variant="h1" sx={{ color: '#ffffff', textAlign: 'center' }}>
        {name}
      </Typography>
      <Divider sx={{ bgcolor: '#ffffff' }} />
      <Typography variant="h3" sx={{ color: '#ffffff', textAlign: 'center' }}>
        {description}
      </Typography>
      <Divider />
      <Button
        variant="outlined"
        sx={{ color: '#ffffff', borderColor: '#ffffff' }}
        size="large"
        onClick={() => navigate(route)}
      >
        Go Now
      </Button>
    </Card>
  )
}

export default HomePageCard
