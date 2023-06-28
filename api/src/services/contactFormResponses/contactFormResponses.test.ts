import type { ContactFormResponse } from '@prisma/client'

import {
  contactFormResponses,
  contactFormResponse,
  createContactFormResponse,
  updateContactFormResponse,
  deleteContactFormResponse,
} from './contactFormResponses'
import type { StandardScenario } from './contactFormResponses.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('contactFormResponses', () => {
  scenario(
    'returns all contactFormResponses',
    async (scenario: StandardScenario) => {
      const result = await contactFormResponses()

      expect(result.length).toEqual(
        Object.keys(scenario.contactFormResponse).length
      )
    }
  )

  scenario(
    'returns a single contactFormResponse',
    async (scenario: StandardScenario) => {
      const result = await contactFormResponse({
        id: scenario.contactFormResponse.one.id,
      })

      expect(result).toEqual(scenario.contactFormResponse.one)
    }
  )

  scenario('creates a contactFormResponse', async () => {
    const result = await createContactFormResponse({
      input: { name: 'String', email: 'String', message: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.email).toEqual('String')
    expect(result.message).toEqual('String')
  })

  scenario(
    'updates a contactFormResponse',
    async (scenario: StandardScenario) => {
      const original = (await contactFormResponse({
        id: scenario.contactFormResponse.one.id,
      })) as ContactFormResponse
      const result = await updateContactFormResponse({
        id: original.id,
        input: { name: 'String2' },
      })

      expect(result.name).toEqual('String2')
    }
  )

  scenario(
    'deletes a contactFormResponse',
    async (scenario: StandardScenario) => {
      const original = (await deleteContactFormResponse({
        id: scenario.contactFormResponse.one.id,
      })) as ContactFormResponse
      const result = await contactFormResponse({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
