import { Box, Typography, Link } from '@mui/material'
import type { FindVideos } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
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
      category
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h4">{'No videos yet. '}</Typography>
    </Box>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ videos }: CellSuccessProps<FindVideos>) => {
  return <Videos videos={videos} />
}
