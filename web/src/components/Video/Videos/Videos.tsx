import {
  Box,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from '@mui/material'
import type { DeleteVideoMutationVariables, FindVideos } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Video/VideosCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_VIDEO_MUTATION = gql`
  mutation DeleteVideoMutation($id: Int!) {
    deleteVideo(id: $id) {
      id
    }
  }
`

const VideosList = ({ videos }: FindVideos) => {
  const [deleteVideo] = useMutation(DELETE_VIDEO_MUTATION, {
    onCompleted: () => {
      toast.success('Video deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteVideoMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete video ' + id + '?')) {
      deleteVideo({ variables: { id } })
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
      <Typography variant="h4">Videos</Typography>
      <TableContainer className="rw-table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Vimeo url</TableCell>
            <TableCell>Created at</TableCell>
            <TableCell>Credits</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id}>
              <TableCell>{truncate(video.id)}</TableCell>
              <TableCell>{truncate(video.title)}</TableCell>
              <TableCell>{truncate(video.description)}</TableCell>
              <TableCell>{truncate(video.vimeoUrl)}</TableCell>
              <TableCell>{timeTag(video.createdAt)}</TableCell>
              <TableCell>{truncate(video.credits)}</TableCell>
              <TableCell>{truncate(video.category)}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                  <Button
                    onClick={() => navigate(routes.video({ id: video.id }))}
                    title={'Show video ' + video.id + ' detail'}
                  >
                    Show
                  </Button>
                  <Button
                    onClick={() => navigate(routes.editVideo({ id: video.id }))}
                    title={'Edit video ' + video.id}
                  >
                    Edit
                  </Button>
                  <Button
                    title={'Delete video ' + video.id}
                    onClick={() => onDeleteClick(video.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </Box>
  )
}

export default VideosList
