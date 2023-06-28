import type { Prisma, ContactFormResponse } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ContactFormResponseCreateArgs>({
  contactFormResponse: {
    one: { data: { name: 'String', email: 'String', message: 'String' } },
    two: { data: { name: 'String', email: 'String', message: 'String' } },
  },
})

export type StandardScenario = ScenarioData<
  ContactFormResponse,
  'contactFormResponse'
>
