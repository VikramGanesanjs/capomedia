import type { Prisma, Booking } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BookingCreateArgs>({
  booking: {
    one: {
      data: {
        startTime: '2023-06-15T22:57:44.041Z',
        endTime: '2023-06-15T22:57:44.041Z',
        producerName: 'String',
        producerEmail: 'String',
        directorName: 'String',
        projectName: 'String',
        extraComments: 'String',
        user: {
          create: {
            email: 'String6949242',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        startTime: '2023-06-15T22:57:44.041Z',
        endTime: '2023-06-15T22:57:44.041Z',
        producerName: 'String',
        producerEmail: 'String',
        directorName: 'String',
        projectName: 'String',
        extraComments: 'String',
        user: {
          create: {
            email: 'String3075052',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Booking, 'booking'>
