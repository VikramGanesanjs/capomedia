import { Grid } from '@mui/material'
import type {
  FindFeaturedQuery,
  FindFeaturedQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import VideoPreview from '../VideoPreview'

export const QUERY = gql`
  query FindFeaturedQuery {
    videos: featuredVideos {
      id
      title
      description
      vimeoUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindFeaturedQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  videos,
}: CellSuccessProps<FindFeaturedQuery, FindFeaturedQueryVariables>) => {
  return (
    <Grid container spacing={2}>
      {videos.map((video) => (
        <VideoPreview
          key={video.id}
          id={video.id}
          url={video.vimeoUrl}
          description={video.description}
          title={video.title}
        />
      ))}
    </Grid>
  )
}
