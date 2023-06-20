import type { Booking } from '@prisma/client'

import {
  bookings,
  booking,
  createBooking,
  updateBooking,
  deleteBooking,
} from './bookings'
import type { StandardScenario } from './bookings.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('bookings', () => {
  scenario('returns all bookings', async (scenario: StandardScenario) => {
    const result = await bookings()

    expect(result.length).toEqual(Object.keys(scenario.booking).length)
  })

  scenario('returns a single booking', async (scenario: StandardScenario) => {
    const result = await booking({ id: scenario.booking.one.id })

    expect(result).toEqual(scenario.booking.one)
  })

  scenario('creates a booking', async (scenario: StandardScenario) => {
    const result = await createBooking({
      input: {
        startTime: '2023-06-15T22:57:44.034Z',
        endTime: '2023-06-15T22:57:44.034Z',
        userId: scenario.booking.two.userId,
        producerName: 'String',
        producerEmail: 'String',
        directorName: 'String',
        projectName: 'String',
        extraComments: 'String',
      },
    })

    expect(result.startTime).toEqual(new Date('2023-06-15T22:57:44.034Z'))
    expect(result.endTime).toEqual(new Date('2023-06-15T22:57:44.034Z'))
    expect(result.userId).toEqual(scenario.booking.two.userId)
    expect(result.producerName).toEqual('String')
    expect(result.producerEmail).toEqual('String')
    expect(result.directorName).toEqual('String')
    expect(result.projectName).toEqual('String')
    expect(result.extraComments).toEqual('String')
  })

  scenario('updates a booking', async (scenario: StandardScenario) => {
    const original = (await booking({ id: scenario.booking.one.id })) as Booking
    const result = await updateBooking({
      id: original.id,
      input: { startTime: '2023-06-16T22:57:44.034Z' },
    })

    expect(result.startTime).toEqual(new Date('2023-06-16T22:57:44.034Z'))
  })

  scenario('deletes a booking', async (scenario: StandardScenario) => {
    const original = (await deleteBooking({
      id: scenario.booking.one.id,
    })) as Booking
    const result = await booking({ id: original.id })

    expect(result).toEqual(null)
  })
})
