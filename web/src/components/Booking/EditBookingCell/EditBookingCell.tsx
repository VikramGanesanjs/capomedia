import { Box, Typography } from '@mui/material'
import type { EditBookingById, UpdateBookingInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookingForm from 'src/components/Booking/BookingForm'

export const QUERY = gql`
  query EditBookingById($id: Int!) {
    booking: booking(id: $id) {
      id
      startTime
      endTime
      userId
      createdAt
      producerName
      producerEmail
      directorName
      projectName
      extraComments
      equipments {
        equipmentId
        equipment {
          id
          name
          category
        }
      }
    }
  }
`
const UPDATE_BOOKING_MUTATION = gql`
  mutation UpdateBookingMutation(
    $id: Int!
    $input: UpdateBookingInput!
    $removalList: [Int]
  ) {
    updateBooking(id: $id, input: $input, removalList: $removalList) {
      id
      startTime
      endTime
      userId
      createdAt
      producerName
      producerEmail
      directorName
      projectName
      extraComments
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ booking }: CellSuccessProps<EditBookingById>) => {
  const [updateBooking, { loading, error }] = useMutation(
    UPDATE_BOOKING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Booking updated')
        navigate(routes.bookings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY, variables: { id: booking.id } }],
      awaitRefetchQueries: true,
    }
  )

  const onSave = (
    input: UpdateBookingInput,
    id: EditBookingById['booking']['id'],
    removalList: number[]
  ) => {
    updateBooking({ variables: { id, input, removalList } })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4">Edit Booking {booking?.projectName}</Typography>
      <Typography variant="h6">
        If not all of the equipment you initially checked out are showing up,
        please refresh the page!
      </Typography>
      <BookingForm
        booking={booking}
        onSave={onSave}
        error={error}
        loading={loading}
      />
    </Box>
  )
}
