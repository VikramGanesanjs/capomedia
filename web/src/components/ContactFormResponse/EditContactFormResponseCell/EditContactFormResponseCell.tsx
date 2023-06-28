import type {
  EditContactFormResponseById,
  UpdateContactFormResponseInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ContactFormResponseForm from 'src/components/ContactFormResponse/ContactFormResponseForm'

export const QUERY = gql`
  query EditContactFormResponseById($id: Int!) {
    contactFormResponse: contactFormResponse(id: $id) {
      id
      name
      createdAt
      email
      message
    }
  }
`
const UPDATE_CONTACT_FORM_RESPONSE_MUTATION = gql`
  mutation UpdateContactFormResponseMutation(
    $id: Int!
    $input: UpdateContactFormResponseInput!
  ) {
    updateContactFormResponse(id: $id, input: $input) {
      id
      name
      createdAt
      email
      message
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  contactFormResponse,
}: CellSuccessProps<EditContactFormResponseById>) => {
  const [updateContactFormResponse, { loading, error }] = useMutation(
    UPDATE_CONTACT_FORM_RESPONSE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ContactFormResponse updated')
        navigate(routes.contactFormResponses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateContactFormResponseInput,
    id: EditContactFormResponseById['contactFormResponse']['id']
  ) => {
    updateContactFormResponse({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ContactFormResponse {contactFormResponse?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ContactFormResponseForm
          contactFormResponse={contactFormResponse}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
