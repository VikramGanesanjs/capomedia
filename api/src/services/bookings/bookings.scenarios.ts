import type { Prisma, Booking } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BookingCreateArgs>({
  booking: {
    one: {
      data: {
        startTime: '2023-05-06T18:45:28.126Z',
        endTime: '2023-05-06T18:45:28.126Z',
        equipment: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        startTime: '2023-05-06T18:45:28.126Z',
        endTime: '2023-05-06T18:45:28.126Z',
        equipment: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Booking, 'booking'>
