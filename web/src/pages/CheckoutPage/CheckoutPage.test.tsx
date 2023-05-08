import { render } from '@redwoodjs/testing/web'

import CheckoutPage from './CheckoutPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CheckoutPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CheckoutPage />)
    }).not.toThrow()
  })
})
