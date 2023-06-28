import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ContactFormResponseForm from 'src/components/ContactFormResponse/ContactFormResponseForm'

import type { CreateContactFormResponseInput } from 'types/graphql'

const CREATE_CONTACT_FORM_RESPONSE_MUTATION = gql`
  mutation CreateContactFormResponseMutation(
    $input: CreateContactFormResponseInput!
  ) {
    createContactFormResponse(input: $input) {
      id
    }
  }
`

const NewContactFormResponse = () => {
  const [createContactFormResponse, { loading, error }] = useMutation(
    CREATE_CONTACT_FORM_RESPONSE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ContactFormResponse created')
        navigate(routes.contactFormResponses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateContactFormResponseInput) => {
    createContactFormResponse({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New ContactFormResponse
        </h2>
      </header>
      <div className="rw-segment-main">
        <ContactFormResponseForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewContactFormResponse
