import type { EditVideoById, UpdateVideoInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import VideoForm from 'src/components/Video/VideoForm'

export const QUERY = gql`
  query EditVideoById($id: Int!) {
    video: video(id: $id) {
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
const UPDATE_VIDEO_MUTATION = gql`
  mutation UpdateVideoMutation($id: Int!, $input: UpdateVideoInput!) {
    updateVideo(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ video }: CellSuccessProps<EditVideoById>) => {
  const [updateVideo, { loading, error }] = useMutation(UPDATE_VIDEO_MUTATION, {
    onCompleted: () => {
      toast.success('Video updated')
      navigate(routes.videos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdateVideoInput,
    id: EditVideoById['video']['id']
  ) => {
    updateVideo({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Video {video?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <VideoForm
          video={video}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
