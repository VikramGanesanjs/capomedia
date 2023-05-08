import type { ComponentMeta } from '@storybook/react'

import CheckoutPage from './CheckoutPage'

export const generated = () => {
  return <CheckoutPage />
}

export default {
  title: 'Pages/CheckoutPage',
  component: CheckoutPage,
} as ComponentMeta<typeof CheckoutPage>
