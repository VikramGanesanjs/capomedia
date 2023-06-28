import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const contactFormResponses: QueryResolvers['contactFormResponses'] =
  () => {
    return db.contactFormResponse.findMany()
  }

export const contactFormResponse: QueryResolvers['contactFormResponse'] = ({
  id,
}) => {
  return db.contactFormResponse.findUnique({
    where: { id },
  })
}

export const createContactFormResponse: MutationResolvers['createContactFormResponse'] =
  ({ input }) => {
    return db.contactFormResponse.create({
      data: input,
    })
  }

export const updateContactFormResponse: MutationResolvers['updateContactFormResponse'] =
  ({ id, input }) => {
    return db.contactFormResponse.update({
      data: input,
      where: { id },
    })
  }

export const deleteContactFormResponse: MutationResolvers['deleteContactFormResponse'] =
  ({ id }) => {
    return db.contactFormResponse.delete({
      where: { id },
    })
  }
