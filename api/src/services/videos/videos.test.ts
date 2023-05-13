import type { Video } from '@prisma/client'

import { videos, video, createVideo, updateVideo, deleteVideo } from './videos'
import type { StandardScenario } from './videos.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('videos', () => {
  scenario('returns all videos', async (scenario: StandardScenario) => {
    const result = await videos()

    expect(result.length).toEqual(Object.keys(scenario.video).length)
  })

  scenario('returns a single video', async (scenario: StandardScenario) => {
    const result = await video({ id: scenario.video.one.id })

    expect(result).toEqual(scenario.video.one)
  })

  scenario('creates a video', async () => {
    const result = await createVideo({
      input: { title: 'String', vimeoUrl: 'String', credits: 'String' },
    })

    expect(result.title).toEqual('String')
    expect(result.vimeoUrl).toEqual('String')
    expect(result.credits).toEqual('String')
  })

  scenario('updates a video', async (scenario: StandardScenario) => {
    const original = (await video({ id: scenario.video.one.id })) as Video
    const result = await updateVideo({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a video', async (scenario: StandardScenario) => {
    const original = (await deleteVideo({ id: scenario.video.one.id })) as Video
    const result = await video({ id: original.id })

    expect(result).toEqual(null)
  })
})
