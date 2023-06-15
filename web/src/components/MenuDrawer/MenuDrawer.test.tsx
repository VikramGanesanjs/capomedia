import { render } from '@redwoodjs/testing/web'

import MenuDrawer from './MenuDrawer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MenuDrawer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MenuDrawer />)
    }).not.toThrow()
  })
})
