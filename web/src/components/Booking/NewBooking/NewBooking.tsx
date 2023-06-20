import { Box, Typography } from '@mui/material'
import type { CreateBookingInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookingForm from 'src/components/Booking/BookingForm'

const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBookingMutation($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
    }
  }
`

const NewBooking = () => {
  const [createBooking, { loading, error }] = useMutation(
    CREATE_BOOKING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Booking created')
        navigate(routes.bookings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateBookingInput) => {
    createBooking({ variables: { input } })
  }

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography variant="h4">Equipment Checkout</Typography>
      <Typography>
        Begin by filling out the checkout date and return date for your
        equipment, and the form will list all of the equipment that is available
        or unavailable for you to check out.{' '}
      </Typography>
      <Typography>
        If a piece of equipment is listed as unavailable, the project that is
        using itis also displayed, so if absolutely necessary you may work out
        any equipment issues with the other producer and the episode's equipment
        manager
      </Typography>
      <BookingForm onSave={onSave} loading={loading} error={error} />
    </Box>
  )
}

export default NewBooking
