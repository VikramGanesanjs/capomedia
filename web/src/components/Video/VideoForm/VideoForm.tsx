import { useState } from 'react'

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material'
import type { EditVideoById, UpdateVideoInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  TextAreaField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormVideo = NonNullable<EditVideoById['video']>

interface VideoFormProps {
  video?: EditVideoById['video']
  onSave: (data: UpdateVideoInput, id?: FormVideo['id']) => void
  error: RWGqlError
  loading: boolean
}

const VideoForm = (props: VideoFormProps) => {
  const onSubmit = (data: FormVideo) => {
    const copy = { ...data }
    copy['featured'] = featured
    props.onSave(copy, props?.video?.id)
  }

  const [featured, setFeatured] = useState(false)

  return (
    <Box className="rw-form-wrapper">
      <Form<FormVideo> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Title</Typography>
        </Label>

        <TextField
          name="title"
          defaultValue={props.video?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Description</Typography>
        </Label>

        <TextField
          name="description"
          defaultValue={props.video?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="vimeoUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Vimeo url</Typography>
        </Label>

        <TextField
          name="vimeoUrl"
          defaultValue={props.video?.vimeoUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="vimeoUrl" className="rw-field-error" />

        <Label
          name="credits"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Credits</Typography>
        </Label>

        <TextAreaField
          name="credits"
          rows={10}
          defaultValue={props.video?.credits}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="credits" className="rw-field-error" />

        <Label
          name="category"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          <Typography>Category</Typography>
        </Label>

        <TextField
          name="category"
          defaultValue={props.video?.credits}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="category" className="rw-field-error" />

        <FormControlLabel
          control={<Checkbox onChange={(e) => setFeatured(e.target.checked)} />}
          label="Would you like this video to be featured?"
        />
        <Box sx={{ flexDirection: 'column', display: 'flex', gap: 2 }}>
          <Submit
            disabled={props.loading}
            style={{ backgroundColor: '#ffffff', border: 'none' }}
          >
            <Button disabled={props.loading} variant="contained">
              Save
            </Button>
          </Submit>
        </Box>
      </Form>
    </Box>
  )
}

export default VideoForm
