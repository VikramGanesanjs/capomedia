import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditContactFormResponseById,
  UpdateContactFormResponseInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormContactFormResponse = NonNullable<
  EditContactFormResponseById['contactFormResponse']
>

interface ContactFormResponseFormProps {
  contactFormResponse?: EditContactFormResponseById['contactFormResponse']
  onSave: (
    data: UpdateContactFormResponseInput,
    id?: FormContactFormResponse['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const ContactFormResponseForm = (props: ContactFormResponseFormProps) => {
  const onSubmit = (data: FormContactFormResponse) => {
    props.onSave(data, props?.contactFormResponse?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormContactFormResponse> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.contactFormResponse?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.contactFormResponse?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="message"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Message
        </Label>

        <TextField
          name="message"
          defaultValue={props.contactFormResponse?.message}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="message" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ContactFormResponseForm
