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
  const {
    startTime,
    endTime,
    equipments,
    userId,
    producerName,
    producerEmail,
    directorName,
    projectName,
    extraComments,
  } = input
  return db.booking.create({
    data: {
      startTime,
      endTime,
      user: {
        connect: { id: userId },
      },
      producerName,
      producerEmail,
      directorName,
      projectName,
      extraComments,
      equipments: {
        create: equipments.map((equipment) => ({
          equipment: {
            connect: { id: equipment.equipmentId },
          },
        })),
      },
    },
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
  db.bookingsOnEquipments.deleteMany({ where: { bookingId: id } })
  return db.booking.delete({ where: id })
}

export const Booking: BookingRelationResolvers = {
  user: (_obj, { root }) => {
    return db.booking.findUnique({ where: { id: root?.id } }).user()
  },

  // I deleted a relation resolver for the equipment because of the custom stuff I did up there, so  if this breaks I should add it back
}
