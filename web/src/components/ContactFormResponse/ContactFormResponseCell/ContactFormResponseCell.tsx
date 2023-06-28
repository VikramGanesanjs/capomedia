import type { FindContactFormResponseById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ContactFormResponse from 'src/components/ContactFormResponse/ContactFormResponse'

export const QUERY = gql`
  query FindContactFormResponseById($id: Int!) {
    contactFormResponse: contactFormResponse(id: $id) {
      id
      name
      createdAt
      email
      message
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ContactFormResponse not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  contactFormResponse,
}: CellSuccessProps<FindContactFormResponseById>) => {
  return <ContactFormResponse contactFormResponse={contactFormResponse} />
}
