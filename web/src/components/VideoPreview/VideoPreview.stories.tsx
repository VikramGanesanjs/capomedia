// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof VideoPreview> = (args) => {
//   return <VideoPreview {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import VideoPreview from './VideoPreview'

export const generated = () => {
  return <VideoPreview />
}

export default {
  title: 'Components/VideoPreview',
  component: VideoPreview,
} as ComponentMeta<typeof VideoPreview>
