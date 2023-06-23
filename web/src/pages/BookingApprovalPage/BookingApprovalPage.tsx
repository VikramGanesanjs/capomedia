import { Box, Typography } from '@mui/material'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import BookingApprovalCell from 'src/components/BookingApprovalCell'

const BookingApprovalPage = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 4,
          gap: 2,
        }}
      >
        <Toaster />
        <Typography variant="h4">Booking Approval</Typography>
        <BookingApprovalCell />
      </Box>
    </>
  )
}

export default BookingApprovalPage
