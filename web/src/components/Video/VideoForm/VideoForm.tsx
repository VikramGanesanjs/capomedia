import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditVideoById, UpdateVideoInput } from 'types/graphql'
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
    props.onSave(data, props?.video?.id)
  }

  return (
    <div className="rw-form-wrapper">
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
          Title
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
          Description
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
          Vimeo url
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
          Credits
        </Label>

        <TextField
          name="credits"
          defaultValue={props.video?.credits}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="credits" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default VideoForm
