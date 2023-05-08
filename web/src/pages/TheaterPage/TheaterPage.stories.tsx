import type { ComponentMeta } from '@storybook/react'

import TheaterPage from './TheaterPage'

export const generated = () => {
  return <TheaterPage />
}

export default {
  title: 'Pages/TheaterPage',
  component: TheaterPage,
} as ComponentMeta<typeof TheaterPage>
