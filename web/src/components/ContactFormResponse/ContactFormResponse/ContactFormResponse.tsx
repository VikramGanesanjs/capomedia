import type {
  DeleteContactFormResponseMutationVariables,
  FindContactFormResponseById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_CONTACT_FORM_RESPONSE_MUTATION = gql`
  mutation DeleteContactFormResponseMutation($id: Int!) {
    deleteContactFormResponse(id: $id) {
      id
    }
  }
`

interface Props {
  contactFormResponse: NonNullable<
    FindContactFormResponseById['contactFormResponse']
  >
}

const ContactFormResponse = ({ contactFormResponse }: Props) => {
  const [deleteContactFormResponse] = useMutation(
    DELETE_CONTACT_FORM_RESPONSE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ContactFormResponse deleted')
        navigate(routes.contactFormResponses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (
    id: DeleteContactFormResponseMutationVariables['id']
  ) => {
    if (
      confirm('Are you sure you want to delete contactFormResponse ' + id + '?')
    ) {
      deleteContactFormResponse({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ContactFormResponse {contactFormResponse.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{contactFormResponse.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{contactFormResponse.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(contactFormResponse.createdAt)}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{contactFormResponse.email}</td>
            </tr>
            <tr>
              <th>Message</th>
              <td>{contactFormResponse.message}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(contactFormResponse.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ContactFormResponse
