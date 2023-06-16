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
    }
  }
`
const UPDATE_BOOKING_MUTATION = gql`
  mutation UpdateBookingMutation($id: Int!, $input: UpdateBookingInput!) {
    updateBooking(id: $id, input: $input) {
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
    }
  )

  const onSave = (
    input: UpdateBookingInput,
    id: EditBookingById['booking']['id']
  ) => {
    updateBooking({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Booking {booking?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <BookingForm
          booking={booking}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
