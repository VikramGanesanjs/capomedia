import { Box, Typography } from '@mui/material'
import type { EditEquipmentById, UpdateEquipmentInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EquipmentForm from 'src/components/Equipment/EquipmentForm'

export const QUERY = gql`
  query EditEquipmentById($id: Int!) {
    equipment: equipment(id: $id) {
      id
      name
      description
      createdAt
      category
    }
  }
`
const UPDATE_EQUIPMENT_MUTATION = gql`
  mutation UpdateEquipmentMutation($id: Int!, $input: UpdateEquipmentInput!) {
    updateEquipment(id: $id, input: $input) {
      id
      name
      description
      createdAt
      category
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ equipment }: CellSuccessProps<EditEquipmentById>) => {
  const [updateEquipment, { loading, error }] = useMutation(
    UPDATE_EQUIPMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Equipment updated')
        navigate(routes.equipments())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateEquipmentInput,
    id: EditEquipmentById['equipment']['id']
  ) => {
    updateEquipment({ variables: { id, input } })
  }

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography variant="h4">Edit Equipment</Typography>
      <EquipmentForm
        onSave={onSave}
        equipment={equipment}
        loading={loading}
        error={error}
      />
    </Box>
  )
}
