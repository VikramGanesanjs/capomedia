import { Box, Button, Typography } from '@mui/material'
import type { EditEquipmentById, UpdateEquipmentInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormEquipment = NonNullable<EditEquipmentById['equipment']>

interface EquipmentFormProps {
  equipment?: EditEquipmentById['equipment']
  onSave: (data: UpdateEquipmentInput, id?: FormEquipment['id']) => void
  error: RWGqlError
  loading: boolean
}

const EquipmentForm = (props: EquipmentFormProps) => {
  const onSubmit = (data: FormEquipment) => {
    props.onSave(data, props?.equipment?.id)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Form<FormEquipment> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Name</Typography>
        </Label>

        <TextField
          name="name"
          defaultValue={props.equipment?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Description</Typography>
        </Label>

        <TextField
          name="description"
          defaultValue={props.equipment?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="category"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Category</Typography>
        </Label>

        <TextField
          name="category"
          defaultValue={props.equipment?.category}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="category" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            style={{ backgroundColor: '#ffffff', border: 'none' }}
          >
            <Button variant="contained" disabled={props.loading}>
              Save
            </Button>
          </Submit>
        </div>
      </Form>
    </Box>
  )
}

export default EquipmentForm
