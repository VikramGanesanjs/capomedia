import type { Prisma, Equipment } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EquipmentCreateArgs>({
  equipment: {
    one: { data: { name: 'String', category: 'String' } },
    two: { data: { name: 'String', category: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Equipment, 'equipment'>
