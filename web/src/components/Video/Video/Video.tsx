import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type { DeleteVideoMutationVariables, FindVideoById } from 'types/graphql'

const DELETE_VIDEO_MUTATION = gql`
  mutation DeleteVideoMutation($id: Int!) {
    deleteVideo(id: $id) {
      id
    }
  }
`

interface Props {
  video: NonNullable<FindVideoById['video']>
}

const Video = ({ video }: Props) => {
  const [deleteVideo] = useMutation(DELETE_VIDEO_MUTATION, {
    onCompleted: () => {
      toast.success('Video deleted')
      navigate(routes.videos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteVideoMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete video ' + id + '?')) {
      deleteVideo({ variables: { id } })
    }
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
