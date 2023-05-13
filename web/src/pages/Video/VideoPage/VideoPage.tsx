import VideoCell from 'src/components/Video/VideoCell'

type VideoPageProps = {
  id: number
}

const VideoPage = ({ id }: VideoPageProps) => {
  return <VideoCell id={id} />
}

export default VideoPage
