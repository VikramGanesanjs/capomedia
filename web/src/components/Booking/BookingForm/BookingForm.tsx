import { useState } from 'react'

import { Typography, Box, Divider, useTheme } from '@mui/material'
import type { EditBookingById, UpdateBookingInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import { useAuth } from 'src/auth'
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
  const { currentUser } = useAuth()
  const equipmentsByCategory = equipmentCategories.map(() => [])

  const onEquipmentSave = (index, equipmentIds) => {
    equipmentsByCategory[index] = equipmentIds
    console.log(equipmentsByCategory)
  }

  const [startDateChosen, setStartDateChosen] = useState(null)
  const [endDateChosen, setEndDateChosen] = useState(null)

  const handleStartDateChange = (e) => {
    setStartDateChosen(e.target.value)
  }

  const handleEndDateChange = (e) => {
    setEndDateChosen(e.target.value)
  }

  const onSubmit = (data: FormBooking) => {
    const dataWithEquipments: UpdateBookingInput = {
      ...data,
      equipments: equipmentsByCategory.flat(),
      userId: currentUser?.id,
    }
    props.onSave(dataWithEquipments, props?.booking?.id)
  }

  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
          <Typography>Checkout Date</Typography>
        </Label>

        <DatetimeLocalField
          name="startTime"
          defaultValue={formatDatetime(props.booking?.startTime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          style={{ fontSize: 15 }}
          validation={{
            required: true,
            validate: (value) => new Date(value) > new Date(),
          }}
          onChange={handleStartDateChange}
        />

        <FieldError name="startTime" className="rw-field-error" />

        <Label
          name="endTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Return Date</Typography>
        </Label>

        <DatetimeLocalField
          name="endTime"
          defaultValue={formatDatetime(props.booking?.endTime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          style={{ fontSize: 15 }}
          validation={{
            required: true,
            validate: (value) =>
              new Date(value) > new Date(startDateChosen) &&
              new Date(value) > new Date(),
          }}
          onChange={handleEndDateChange}
        />

        <FieldError name="endTime" className="rw-field-error" />

        <Label
          name="producerName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Producer's Name</Typography>
        </Label>

        <TextField
          name="producerName"
          defaultValue={props.booking?.producerName}
          className="rw-input"
          style={{ fontSize: 15 }}
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="producerName" className="rw-field-error" />

        <Label
          name="producerEmail"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Producer's E-mail</Typography>
        </Label>

        <TextField
          name="producerEmail"
          defaultValue={props.booking?.producerEmail}
          style={{ fontSize: 15 }}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true, pattern: /^[^@]+@[^.]+\..+$/ }}
        />

        <FieldError name="producerEmail" className="rw-field-error" />

        <Label
          name="directorName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Director's Name</Typography>
        </Label>

        <TextField
          name="directorName"
          defaultValue={props.booking?.directorName}
          style={{ fontSize: 15 }}
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
          <Typography>Project Name</Typography>
        </Label>

        <TextField
          name="projectName"
          defaultValue={props.booking?.projectName}
          style={{ fontSize: 15 }}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="projectName" className="rw-field-error" />

        {startDateChosen &&
          endDateChosen &&
          equipmentCategories.map((category, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography variant="h6">{category}</Typography>
              <EquipmentAvailableByCategoryCell
                shootStartTime={startDateChosen}
                shootEndTime={endDateChosen}
                category={category}
                categoryIndex={index}
                key={index}
                onSave={onEquipmentSave}
              />
            </Box>
          ))}

        <Label
          name="extraComments"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Any extra questions, comments, or concerns?</Typography>
        </Label>

        <TextAreaField
          name="extraComments"
          defaultValue={props.booking?.extraComments}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          rows={5}
          style={{ fontSize: 15 }}
        />

        <FieldError name="extraComments" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </Box>
  )
}

export default BookingForm
