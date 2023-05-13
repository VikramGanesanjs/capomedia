import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const videos: QueryResolvers['videos'] = () => {
  return db.video.findMany()
}

export const video: QueryResolvers['video'] = ({ id }) => {
  return db.video.findUnique({
    where: { id },
  })
}

export const createVideo: MutationResolvers['createVideo'] = ({ input }) => {
  return db.video.create({
    data: input,
  })
}

export const updateVideo: MutationResolvers['updateVideo'] = ({
  id,
  input,
}) => {
  return db.video.update({
    data: input,
    where: { id },
  })
}

export const deleteVideo: MutationResolvers['deleteVideo'] = ({ id }) => {
  return db.video.delete({
    where: { id },
  })
}
