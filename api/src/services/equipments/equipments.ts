import type {
  QueryResolvers,
  MutationResolvers,
  EquipmentRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const equipments: QueryResolvers['equipments'] = () => {
  return db.equipment.findMany()
}

export const equipment: QueryResolvers['equipment'] = ({ id }) => {
  return db.equipment.findUnique({
    where: { id },
  })
}

export const createEquipment: MutationResolvers['createEquipment'] = ({
  input,
}) => {
  return db.equipment.create({
    data: input,
  })
}

export const equipmentByCategory: QueryResolvers['equipmentByCategory'] = ({
  category,
}) => {
  return db.equipment.findMany({
    where: { category },
  })
}

export const updateEquipment: MutationResolvers['updateEquipment'] = ({
  id,
  input,
}) => {
  return db.equipment.update({
    data: input,
    where: { id },
  })
}

export const deleteEquipment: MutationResolvers['deleteEquipment'] = async ({
  id,
}) => {
  await db.bookingsOnEquipments.deleteMany({ where: { equipmentId: id } })
  return db.equipment.delete({ where: { id } })
}

export const Equipment: EquipmentRelationResolvers = {
  bookings: async (_obj, { root }) => {
    return db.bookingsOnEquipments.findMany({
      where: { equipmentId: root?.id },
      include: { booking: true },
    })
  },
}
