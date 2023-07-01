import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import type {
  DeleteContactFormResponseMutationVariables,
  FindContactFormResponses,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
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
    <Box>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Created at</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactFormResponses.map((contactFormResponse) => (
            <TableRow key={contactFormResponse.id}>
              <TableCell>{truncate(contactFormResponse.id)}</TableCell>
              <TableCell>{truncate(contactFormResponse.name)}</TableCell>
              <TableCell>{timeTag(contactFormResponse.createdAt)}</TableCell>
              <TableCell>{truncate(contactFormResponse.email)}</TableCell>
              <TableCell>{truncate(contactFormResponse.message)}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                  <Button
                    onClick={() =>
                      navigate(
                        routes.contactFormResponse({
                          id: contactFormResponse.id,
                        })
                      )
                    }
                    title={
                      'Show contactFormResponse ' +
                      contactFormResponse.id +
                      ' detail'
                    }
                    variant="contained"
                  >
                    Show
                  </Button>
                  <Button
                    variant="contained"
                    title={
                      'Delete contactFormResponse ' + contactFormResponse.id
                    }
                    onClick={() => onDeleteClick(contactFormResponse.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </Box>
  )
}

export default ContactFormResponsesList
