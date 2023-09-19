export const schema = gql`
  type Equipment {
    id: Int!
    name: String!
    description: String
    bookings: [BookingEquipment]!
    createdAt: DateTime!
    category: String!
    multiple: Boolean
    quantityTotal: Int
  }

  type Query {
    equipments: [Equipment!]! @requireAuth
    equipment(id: Int!): Equipment @requireAuth
    equipmentByCategory(category: String!): [Equipment!]! @requireAuth
  }

  input CreateEquipmentInput {
    name: String!
    description: String
    category: String!
    multiple: Boolean
    quantityTotal: Int
  }

  input UpdateEquipmentInput {
    name: String
    description: String
    category: String
    multiple: Boolean
    quantityTotal: Int
  }

  type Mutation {
    createEquipment(input: CreateEquipmentInput!): Equipment! @requireAuth
    updateEquipment(id: Int!, input: UpdateEquipmentInput!): Equipment!
      @requireAuth
    deleteEquipment(id: Int!): Equipment! @requireAuth
  }
`
