import { Grid } from '@mui/material'
import type {
  FindVideoCategoryQuery,
  FindVideoCategoryQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import VideoPreview from 'src/components/VideoPreview'

export const QUERY = gql`
  query FindVideoCategoryQuery($category: String!) {
    videos: videosByCategory(category: $category) {
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
}: CellFailureProps<FindVideoCategoryQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  videos,
}: CellSuccessProps<
  FindVideoCategoryQuery,
  FindVideoCategoryQueryVariables
>) => {
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
