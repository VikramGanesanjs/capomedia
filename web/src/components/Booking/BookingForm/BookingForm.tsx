import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditBookingById, UpdateBookingInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

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

const BookingForm = (props: BookingFormProps) => {
  const onSubmit = (data: FormBooking) => {
    props.onSave(data, props?.booking?.id)
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
          name="equipmentId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Equipment id
        </Label>

        <NumberField
          name="equipmentId"
          defaultValue={props.booking?.equipmentId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="equipmentId" className="rw-field-error" />

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
