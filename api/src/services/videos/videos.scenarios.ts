import type { Prisma, Video } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.VideoCreateArgs>({
  video: {
    one: { data: { title: 'String', vimeoUrl: 'String', credits: 'String' } },
    two: { data: { title: 'String', vimeoUrl: 'String', credits: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Video, 'video'>
