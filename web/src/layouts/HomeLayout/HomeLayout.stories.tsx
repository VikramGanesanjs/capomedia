import type { ComponentMeta, ComponentStory } from '@storybook/react'

import HomeLayout from './HomeLayout'

export const generated: ComponentStory<typeof HomeLayout> = (args) => {
  return <HomeLayout {...args} />
}

export default {
  title: 'Layouts/HomeLayout',
  component: HomeLayout,
} as ComponentMeta<typeof HomeLayout>
