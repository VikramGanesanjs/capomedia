import { render } from '@redwoodjs/testing/web'

import TheaterPage from './TheaterPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TheaterPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TheaterPage />)
    }).not.toThrow()
  })
})
