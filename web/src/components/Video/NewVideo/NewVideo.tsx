import { Box, Typography } from '@mui/material'
import type { CreateVideoInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import VideoForm from 'src/components/Video/VideoForm'

const CREATE_VIDEO_MUTATION = gql`
  mutation CreateVideoMutation($input: CreateVideoInput!) {
    createVideo(input: $input) {
      id
    }
  }
`

const NewVideo = () => {
  const [createVideo, { loading, error }] = useMutation(CREATE_VIDEO_MUTATION, {
    onCompleted: () => {
      toast.success('Video created')
      navigate(routes.videos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateVideoInput) => {
    createVideo({ variables: { input } })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h4">New Video</Typography>
      <Typography>
        The predefined categories which can be changed are:
      </Typography>
      <Typography>
        'Capo.360', 'Short Film', 'Spot Feature', 'Independent', 'Show Open',
      </Typography>
      <VideoForm onSave={onSave} loading={loading} error={error} />
    </Box>
  )
}

export default NewVideo
