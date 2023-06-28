import { Box, Typography } from '@mui/material'
import type { FindContactFormResponses } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ContactFormResponses from 'src/components/ContactFormResponse/ContactFormResponses'

export const QUERY = gql`
  query FindContactFormResponses {
    contactFormResponses {
      id
      name
      createdAt
      email
      message
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h2">
        There are no responses to the contact form yet.
      </Typography>
    </Box>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  contactFormResponses,
}: CellSuccessProps<FindContactFormResponses>) => {
  return <ContactFormResponses contactFormResponses={contactFormResponses} />
}
