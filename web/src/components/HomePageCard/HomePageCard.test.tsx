import { render } from '@redwoodjs/testing/web'

import HomePageCard from './HomePageCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HomePageCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePageCard />)
    }).not.toThrow()
  })
})
