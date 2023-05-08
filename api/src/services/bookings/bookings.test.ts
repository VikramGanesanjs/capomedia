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
        startTime: '2023-05-06T18:45:28.120Z',
        endTime: '2023-05-06T18:45:28.120Z',
        equipmentId: scenario.booking.two.equipmentId,
      },
    })

    expect(result.startTime).toEqual(new Date('2023-05-06T18:45:28.120Z'))
    expect(result.endTime).toEqual(new Date('2023-05-06T18:45:28.120Z'))
    expect(result.equipmentId).toEqual(scenario.booking.two.equipmentId)
  })

  scenario('updates a booking', async (scenario: StandardScenario) => {
    const original = (await booking({ id: scenario.booking.one.id })) as Booking
    const result = await updateBooking({
      id: original.id,
      input: { startTime: '2023-05-07T18:45:28.120Z' },
    })

    expect(result.startTime).toEqual(new Date('2023-05-07T18:45:28.120Z'))
  })

  scenario('deletes a booking', async (scenario: StandardScenario) => {
    const original = (await deleteBooking({
      id: scenario.booking.one.id,
    })) as Booking
    const result = await booking({ id: original.id })

    expect(result).toEqual(null)
  })
})
