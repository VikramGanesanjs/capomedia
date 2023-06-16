import type { FindBookings } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Bookings from 'src/components/Booking/Bookings'

export const QUERY = gql`
  query FindBookings {
    bookings {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bookings yet. '}
      <Link to={routes.newBooking()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ bookings }: CellSuccessProps<FindBookings>) => {
  return <Bookings bookings={bookings} />
}
