import type {
  DeleteContactFormResponseMutationVariables,
  FindContactFormResponses,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ContactFormResponse/ContactFormResponsesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_CONTACT_FORM_RESPONSE_MUTATION = gql`
  mutation DeleteContactFormResponseMutation($id: Int!) {
    deleteContactFormResponse(id: $id) {
      id
    }
  }
`

const ContactFormResponsesList = ({
  contactFormResponses,
}: FindContactFormResponses) => {
  const [deleteContactFormResponse] = useMutation(
    DELETE_CONTACT_FORM_RESPONSE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ContactFormResponse deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Created at</th>
            <th>Email</th>
            <th>Message</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {contactFormResponses.map((contactFormResponse) => (
            <tr key={contactFormResponse.id}>
              <td>{truncate(contactFormResponse.id)}</td>
              <td>{truncate(contactFormResponse.name)}</td>
              <td>{timeTag(contactFormResponse.createdAt)}</td>
              <td>{truncate(contactFormResponse.email)}</td>
              <td>{truncate(contactFormResponse.message)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.contactFormResponse({
                      id: contactFormResponse.id,
                    })}
                    title={
                      'Show contactFormResponse ' +
                      contactFormResponse.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <button
                    type="button"
                    title={
                      'Delete contactFormResponse ' + contactFormResponse.id
                    }
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(contactFormResponse.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContactFormResponsesList
