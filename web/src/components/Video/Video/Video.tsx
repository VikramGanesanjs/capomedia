import { useEffect } from 'react'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box, Button, Typography } from '@mui/material'
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

  useEffect(() => {
    console.log(nextQuery.data)
    console.log(nextQuery.error)
  })
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
            position: 'absolute',
            right: '3%',
            top: '3%',
          }}
        >
          <MenuDrawer />
        </Box>
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
          <Typography
            sx={{ color: '#ffffff', textAlign: 'center' }}
            variant="h1"
          >
            {video.title}
          </Typography>
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
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Video {video.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{video.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{video.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{video.description}</td>
            </tr>
            <tr>
              <th>Vimeo url</th>
              <td>{video.vimeoUrl}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(video.createdAt)}</td>
            </tr>
            <tr>
              <th>Credits</th>
              <td>{video.credits}</td>
            </tr>
          </tbody>
        </table>
        <ReactPlayer
          url={video.vimeoUrl}
          controls={true}
          height="50vh"
          width="50vw"
        />
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editVideo({ id: video.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(video.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Video
