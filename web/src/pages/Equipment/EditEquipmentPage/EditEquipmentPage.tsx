import EditEquipmentCell from 'src/components/Equipment/EditEquipmentCell'

type EquipmentPageProps = {
  id: number
}

const EditEquipmentPage = ({ id }: EquipmentPageProps) => {
  return <EditEquipmentCell id={id} />
}

export default EditEquipmentPage
