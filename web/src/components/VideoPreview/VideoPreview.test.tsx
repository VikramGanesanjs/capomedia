import { render } from '@redwoodjs/testing/web'

import VideoPreview from './VideoPreview'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('VideoPreview', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VideoPreview />)
    }).not.toThrow()
  })
})
