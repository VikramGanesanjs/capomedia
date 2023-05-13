import type { FindVideos } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Videos from 'src/components/Video/Videos'

export const QUERY = gql`
  query FindVideos {
    videos {
      id
      title
      description
      vimeoUrl
      createdAt
      credits
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No videos yet. '}
      <Link to={routes.newVideo()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ videos }: CellSuccessProps<FindVideos>) => {
  return <Videos videos={videos} />
}
