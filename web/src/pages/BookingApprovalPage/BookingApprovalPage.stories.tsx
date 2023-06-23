import type { ComponentMeta } from '@storybook/react'

import BookingApprovalPage from './BookingApprovalPage'

export const generated = () => {
  return <BookingApprovalPage />
}

export default {
  title: 'Pages/BookingApprovalPage',
  component: BookingApprovalPage,
} as ComponentMeta<typeof BookingApprovalPage>
