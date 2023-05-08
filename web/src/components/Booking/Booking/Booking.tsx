import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type {
  DeleteBookingMutationVariables,
  FindBookingById,
} from 'types/graphql'

const DELETE_BOOKING_MUTATION = gql`
  mutation DeleteBookingMutation($id: Int!) {
    deleteBooking(id: $id) {
      id
    }
  }
`

interface Props {
  booking: NonNullable<FindBookingById['booking']>
}

const Booking = ({ booking }: Props) => {
  const [deleteBooking] = useMutation(DELETE_BOOKING_MUTATION, {
    onCompleted: () => {
      toast.success('Booking deleted')
      navigate(routes.bookings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteBookingMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete booking ' + id + '?')) {
      deleteBooking({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Booking {booking.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{booking.id}</td>
            </tr>
            <tr>
              <th>Start time</th>
              <td>{timeTag(booking.startTime)}</td>
            </tr>
            <tr>
              <th>End time</th>
              <td>{timeTag(booking.endTime)}</td>
            </tr>
            <tr>
              <th>Equipment id</th>
              <td>{booking.equipmentId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(booking.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editBooking({ id: booking.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(booking.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Booking
