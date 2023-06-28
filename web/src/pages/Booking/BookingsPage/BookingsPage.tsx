import { Box, Typography } from '@mui/material'

import BookingsCell from 'src/components/Booking/BookingsCell'

const BookingsPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}>
      <Typography variant="h4">Bookings</Typography>
      <BookingsCell />
    </Box>
  )
}

export default BookingsPage
