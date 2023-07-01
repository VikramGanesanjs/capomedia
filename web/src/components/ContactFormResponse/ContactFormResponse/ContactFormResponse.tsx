import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import type {
  DeleteContactFormResponseMutationVariables,
  FindContactFormResponseById,
} from 'types/graphql'

import { Link, routes, Boxigate } from '@redwoodjs/router'
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
        Boxigate(routes.contactFormResponses())
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography variant="h4">
          Contact Form Response {contactFormResponse.id} Detail
        </Typography>

        <TableContainer className="rw-table">
          <TableBody>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>{contactFormResponse.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{contactFormResponse.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Created at</TableCell>
              <TableCell>{timeTag(contactFormResponse.createdAt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{contactFormResponse.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Message</TableCell>
              <TableCell>{contactFormResponse.message}</TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={() => onDeleteClick(contactFormResponse.id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  )
}

export default ContactFormResponse
