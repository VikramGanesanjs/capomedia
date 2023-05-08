import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EquipmentForm from 'src/components/Equipment/EquipmentForm'

import type { CreateEquipmentInput } from 'types/graphql'

const CREATE_EQUIPMENT_MUTATION = gql`
  mutation CreateEquipmentMutation($input: CreateEquipmentInput!) {
    createEquipment(input: $input) {
      id
    }
  }
`

const NewEquipment = () => {
  const [createEquipment, { loading, error }] = useMutation(
    CREATE_EQUIPMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Equipment created')
        navigate(routes.equipments())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateEquipmentInput) => {
    createEquipment({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Equipment</h2>
      </header>
      <div className="rw-segment-main">
        <EquipmentForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewEquipment
