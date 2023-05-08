import EquipmentCell from 'src/components/Equipment/EquipmentCell'

type EquipmentPageProps = {
  id: number
}

const EquipmentPage = ({ id }: EquipmentPageProps) => {
  return <EquipmentCell id={id} />
}

export default EquipmentPage
