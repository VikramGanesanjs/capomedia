// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof MenuDrawer> = (args) => {
//   return <MenuDrawer {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import MenuDrawer from './MenuDrawer'

export const generated = () => {
  return <MenuDrawer />
}

export default {
  title: 'Components/MenuDrawer',
  component: MenuDrawer,
} as ComponentMeta<typeof MenuDrawer>
