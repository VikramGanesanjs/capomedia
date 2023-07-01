import { Box, Typography } from '@mui/material'
import type { CreateEquipmentInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EquipmentForm from 'src/components/Equipment/EquipmentForm'

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
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography variant="h4">New Equipment</Typography>
      <EquipmentForm onSave={onSave} loading={loading} error={error} />
    </Box>
  )
}

export default NewEquipment
