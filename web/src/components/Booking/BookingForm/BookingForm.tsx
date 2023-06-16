import { Typography } from '@mui/material'
import type { EditBookingById, UpdateBookingInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import EquipmentAvailableByCategoryCell from 'src/components/EquipmentAvailableByCategoryCell'
const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormBooking = NonNullable<EditBookingById['booking']>

interface BookingFormProps {
  booking?: EditBookingById['booking']
  onSave: (data: UpdateBookingInput, id?: FormBooking['id']) => void
  error: RWGqlError
  loading: boolean
}

const equipmentCategories = ['Camera Equipment', 'Audio Equipment']

const BookingForm = (props: BookingFormProps) => {
  const equipmentsByCategory = equipmentCategories.map(() => [])

  const onEquipmentSave = (index, equipmentIds) => {
    equipmentsByCategory[index] = equipmentIds
    console.log(equipmentsByCategory)
  }

  const onSubmit = (data: FormBooking) => {
    const dataWithEquipments: UpdateBookingInput = {
      ...data,
      equipments: equipmentsByCategory.flat(),
    }
    props.onSave(dataWithEquipments, props?.booking?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormBooking> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="startTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start time
        </Label>

        <DatetimeLocalField
          name="startTime"
          defaultValue={formatDatetime(props.booking?.startTime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="startTime" className="rw-field-error" />

        <Label
          name="endTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End time
        </Label>

        <DatetimeLocalField
          name="endTime"
          defaultValue={formatDatetime(props.booking?.endTime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="endTime" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.booking?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="producerName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Producer name
        </Label>

        <TextField
          name="producerName"
          defaultValue={props.booking?.producerName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="producerName" className="rw-field-error" />

        <Label
          name="producerEmail"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Producer email
        </Label>

        <TextField
          name="producerEmail"
          defaultValue={props.booking?.producerEmail}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="producerEmail" className="rw-field-error" />

        <Label
          name="directorName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Director name
        </Label>

        <TextField
          name="directorName"
          defaultValue={props.booking?.directorName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="directorName" className="rw-field-error" />

        <Label
          name="projectName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Project name
        </Label>

        <TextField
          name="projectName"
          defaultValue={props.booking?.projectName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="projectName" className="rw-field-error" />

        <Label
          name="extraComments"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Extra comments
        </Label>

        <TextField
          name="extraComments"
          defaultValue={props.booking?.extraComments}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="extraComments" className="rw-field-error" />

        {equipmentCategories.map((category, index) => (
          <>
            <Typography>{category}</Typography>
            <EquipmentAvailableByCategoryCell
              shootStartTime={props.booking?.startTime}
              shootEndTime={props.booking?.endTime}
              category={category}
              categoryIndex={index}
              key={index}
              onSave={onEquipmentSave}
            />
          </>
        ))}
        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BookingForm
