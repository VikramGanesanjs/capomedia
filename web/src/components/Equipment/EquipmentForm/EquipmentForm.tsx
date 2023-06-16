import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditEquipmentById, UpdateEquipmentInput } from 'types/graphql'
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
    <div className="rw-form-wrapper">
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
          Name
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
          Description
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
          Category
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
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EquipmentForm
