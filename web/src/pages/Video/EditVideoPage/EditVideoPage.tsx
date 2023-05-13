import EditVideoCell from 'src/components/Video/EditVideoCell'

type VideoPageProps = {
  id: number
}

const EditVideoPage = ({ id }: VideoPageProps) => {
  return <EditVideoCell id={id} />
}

export default EditVideoPage
