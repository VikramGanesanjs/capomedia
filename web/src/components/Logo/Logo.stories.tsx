// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Logo> = (args) => {
//   return <Logo {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Logo from './Logo'

export const generated = () => {
  return <Logo />
}

export default {
  title: 'Components/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>
