import { Box, Typography, Button } from '@mui/material'
import type {
  EditContactFormResponseById,
  UpdateContactFormResponseInput,
} from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
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
    <Box className="rw-form-wrapper">
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
          <Typography>Name</Typography>
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
          <Typography>Email</Typography>
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
          <Typography>Message</Typography>
        </Label>

        <TextField
          name="message"
          defaultValue={props.contactFormResponse?.message}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="message" className="rw-field-error" />

        <Box className="rw-button-group">
          <Submit disabled={props.loading}>
            <Button disabled={props.loading} variant="contained">
              Save
            </Button>
          </Submit>
        </Box>
      </Form>
    </Box>
  )
}

export default ContactFormResponseForm
