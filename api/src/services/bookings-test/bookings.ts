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
  const booking = db.booking.create({
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

  // send email with sendGrid

  // const sgMail = require('@sendgrid/mail')
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  // const msg = {
  //   to: producerEmail, // Change to your recipient
  //   from: 'vkganesan@icloud.com', // Change to your verified sender
  //   subject: 'Sending with SendGrid is Fun',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // }
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log('Email sent')
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })
  return booking
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

export const deleteBooking: MutationResolvers['deleteBooking'] = async ({
  id,
}) => {
  await db.bookingsOnEquipments.deleteMany({ where: { bookingId: id } })
  return db.booking.delete({ where: { id } })
}

export const Booking: BookingRelationResolvers = {
  user: (_obj, { root }) => {
    return db.booking.findUnique({ where: { id: root?.id } }).user()
  },
  equipments: async (_obj, { root }) => {
    return db.bookingsOnEquipments.findMany({
      where: { bookingId: root?.id },
      include: { equipment: true },
    })
  },
  // I deleted a relation resolver for the equipment because of the custom stuff I did up there, so  if this breaks I should add it back
}
