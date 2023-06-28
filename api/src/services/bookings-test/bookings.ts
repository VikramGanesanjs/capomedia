import type {
  QueryResolvers,
  MutationResolvers,
  BookingRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { equipment } from '../equipments/equipments'

export const bookings: QueryResolvers['bookings'] = () => {
  return db.booking.findMany({ orderBy: { startTime: 'desc' } })
}

export const booking: QueryResolvers['booking'] = ({ id }) => {
  return db.booking.findUnique({
    where: { id },
  })
}

export const pendingBookings: QueryResolvers['pendingBookings'] = () => {
  return db.booking.findMany({
    where: {
      approval: 'Pending',
    },
  })
}

export const currentBookings: QueryResolvers['currentBookings'] = () => {
  return db.booking.findMany({ where: { endTime: { gt: new Date() } } })
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

  const arrayOfEquipmentNames = equipments.map(
    (equipment) => equipment.equipmentName
  )

  let htmlString = '<p>'

  arrayOfEquipmentNames.forEach((equipmentName) => {
    htmlString += `<br>${equipmentName}`
  })

  htmlString += '</p>'

  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: producerEmail, // Change to your recipient
    from: 'vkganesan@icloud.com', // Change to your verified sender
    subject: `Your Equipment Checkout Details for project ${projectName}`,
    html: `
      <div>
        <h1>
          Equipment Checked Out
        </h1>
        <h2>Your equipment order is still pending approval, we will send you another email when it is approved!</h2>
        ${htmlString}

      </div>

    `,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
  return booking
}

export const updateBooking: MutationResolvers['updateBooking'] = async ({
  id,
  input,
  removalList,
}) => {
  const existingBooking = await db.booking.findUnique({
    where: { id },
    include: { equipments: { include: { equipment: true } } },
  })
  if (input.approval) {
    const arrayOfEquipmentNames = existingBooking.equipments.map(
      (equipment) => equipment.equipment.name
    )

    let htmlString = '<p>'

    arrayOfEquipmentNames.forEach((equipmentName) => {
      htmlString += `<br>${equipmentName}`
    })

    htmlString += '</p>'

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: input.producerEmail ?? existingBooking.producerEmail, // Change to your recipient
      from: 'vkganesan@icloud.com', // Change to your verified sender
      subject: `Your Equipment Checkout Request Has Been ${input.approval}`,
      html: `

        <div>
        <h1>Your equipment checkout request has been ${input.approval}</h1>
        <p>Contact Mr. Landino or any of the producers for more questions. </p>

          <h2>
            Equipment Checked Out:
          </h2>
          ${htmlString}
        </div>

      `,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const { equipments, userId, ...rest } = input
  return db.booking.update({
    data: {
      user: {
        connect: { id: userId },
      },
      ...rest,
      equipments: {
        deleteMany: {
          bookingId: id,
          equipmentId: { in: removalList },
        },
        connectOrCreate: equipments.map((equipment) => ({
          where: {
            bookingId_equipmentId: {
              bookingId: id,
              equipmentId: equipment.equipmentId,
            },
          },
          create: {
            equipment: {
              connect: { id: equipment.equipmentId },
            },
          },
        })),
      },
    },
    where: { id },
    include: { equipments: true },
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
