import { render } from '@redwoodjs/testing/web'

import BookingApprovalPage from './BookingApprovalPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BookingApprovalPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BookingApprovalPage />)
    }).not.toThrow()
  })
})
