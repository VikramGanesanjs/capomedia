import type {
  QueryResolvers,
  MutationResolvers,
  BookingRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const bookings: QueryResolvers['bookings'] = () => {
  return db.booking.findMany()
}

export const booking: QueryResolvers['booking'] = ({ id }) => {
  return db.booking.findUnique({
    where: { id },
  })
}

export const createBooking: MutationResolvers['createBooking'] = ({
  input,
}) => {
  return db.booking.create({
    data: input,
  })
}

export const updateBooking: MutationResolvers['updateBooking'] = ({
  id,
  input,
}) => {
  return db.booking.update({
    data: input,
    where: { id },
  })
}

export const deleteBooking: MutationResolvers['deleteBooking'] = ({ id }) => {
  return db.booking.delete({
    where: { id },
  })
}

export const Booking: BookingRelationResolvers = {
  equipment: (_obj, { root }) => {
    return db.booking.findUnique({ where: { id: root?.id } }).equipment()
  },
}
