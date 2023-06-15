import type { DeleteVideoMutationVariables, FindVideos } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Vimeo url</th>
            <th>Created at</th>
            <th>Credits</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{truncate(video.id)}</td>
              <td>{truncate(video.title)}</td>
              <td>{truncate(video.description)}</td>
              <td>{truncate(video.vimeoUrl)}</td>
              <td>{timeTag(video.createdAt)}</td>
              <td>{truncate(video.credits)}</td>
              <td>{truncate(video.category)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.video({ id: video.id })}
                    title={'Show video ' + video.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editVideo({ id: video.id })}
                    title={'Edit video ' + video.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete video ' + video.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(video.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VideosList
