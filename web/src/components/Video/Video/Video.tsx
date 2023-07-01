import { useEffect } from 'react'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import ReactPlayer from 'react-player'
import type { DeleteVideoMutationVariables, FindVideoById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import MenuDrawer from 'src/components/MenuDrawer/MenuDrawer'
import { timeTag } from 'src/lib/formatters'

const DELETE_VIDEO_MUTATION = gql`
  mutation DeleteVideoMutation($id: Int!) {
    deleteVideo(id: $id) {
      id
    }
  }
`

const PREV_OR_NEXT_VIDEO_QUERY = gql`
  query PreviousVideoQuery($id: Int!) {
    video: video(id: $id) {
      id
    }
  }
`

interface Props {
  video: NonNullable<FindVideoById['video']>
}

const Video = ({ video }: Props) => {
  const { hasRole } = useAuth()
  const theme = useTheme()

  const [deleteVideo] = useMutation(DELETE_VIDEO_MUTATION, {
    onCompleted: () => {
      toast.success('Video deleted')
      navigate(routes.videos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const prevQuery = useQuery(PREV_OR_NEXT_VIDEO_QUERY, {
    variables: { id: video.id - 1 },
  })

  const nextQuery = useQuery(PREV_OR_NEXT_VIDEO_QUERY, {
    variables: { id: video.id + 1 },
  })

  const onDeleteClick = (id: DeleteVideoMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete video ' + id + '?')) {
      deleteVideo({ variables: { id } })
    }
  }
  if (!hasRole('admin')) {
    return (
      <Box
        sx={{
          bgcolor: '#000000',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          overflow: 'auto',
          p: 0,
          m: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 14,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              p: 4,
            }}
          >
            <Typography
              sx={{
                color: '#ffffff',
                textAlign: 'center',
                fontSize: {
                  xs: theme.typography.h2.fontSize,
                  lg: theme.typography.h1.fontSize,
                },
              }}
              variant="h1"
            >
              {video.title}
            </Typography>
            <MenuDrawer sx={{}} color={theme.palette.primary.light} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {(prevQuery.loading || prevQuery.data.video) && (
              <Button
                onClick={() => navigate(routes.video({ id: video.id - 1 }))}
              >
                <ArrowBackIosNewIcon />
              </Button>
            )}
            <ReactPlayer
              url={video.vimeoUrl}
              controls={true}
              height="70vh"
              width="80vw"
            />

            {(nextQuery.loading || nextQuery.data.video) && (
              <Button
                onClick={() => navigate(routes.video({ id: video.id + 1 }))}
              >
                <ArrowForwardIosIcon />
              </Button>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography
              sx={{ color: '#ffffff', textAlign: 'center' }}
              variant="h4"
            >
              Credits:
            </Typography>
            {video.credits.split('\n').map((credit, idx) => (
              <Typography
                key={idx}
                sx={{ color: '#ffffff', textAlign: 'center' }}
                variant="body2"
              >
                {credit}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <Typography variant="h4">
          {`Video ${video.title} Admin View`}
        </Typography>
        <TableContainer className="rw-table">
          <TableBody>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>{video.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>{video.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{video.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vimeo url</TableCell>
              <TableCell>{video.vimeoUrl}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Created at</TableCell>
              <TableCell>{timeTag(video.createdAt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Credits</TableCell>
              <TableCell>{video.credits}</TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
        <ReactPlayer
          url={video.vimeoUrl}
          controls={true}
          height="50vh"
          width="50vw"
        />
      </Box>
      <Box className="rw-button-group">
        <Button
          onClick={() => navigate(routes.editVideo({ id: video.id }))}
          className="rw-button rw-button-blue"
        >
          Edit
        </Button>
        <Button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(video.id)}
        >
          Delete
        </Button>
      </Box>
    </>
  )
}

export default Video
