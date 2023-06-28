export const schema = gql`
  type ContactFormResponse {
    id: Int!
    name: String!
    createdAt: DateTime!
    email: String!
    message: String!
  }

  type Query {
    contactFormResponses: [ContactFormResponse!]! @requireAuth
    contactFormResponse(id: Int!): ContactFormResponse @requireAuth
  }

  input CreateContactFormResponseInput {
    name: String!
    email: String!
    message: String!
  }

  input UpdateContactFormResponseInput {
    name: String
    email: String
    message: String
  }

  type Mutation {
    createContactFormResponse(
      input: CreateContactFormResponseInput!
    ): ContactFormResponse! @requireAuth
    updateContactFormResponse(
      id: Int!
      input: UpdateContactFormResponseInput!
    ): ContactFormResponse! @requireAuth
    deleteContactFormResponse(id: Int!): ContactFormResponse! @requireAuth
  }
`
