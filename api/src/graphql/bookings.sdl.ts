export const schema = gql`
  type Booking {
    id: Int!
    startTime: DateTime!
    endTime: DateTime!
    equipments: [BookingEquipment!]!
    user: User!
    userId: Int!
    createdAt: DateTime!
    producerName: String!
    producerEmail: String!
    directorName: String!
    projectName: String!
    extraComments: String!
  }

  type Query {
    bookings: [Booking!]! @requireAuth
    booking(id: Int!): Booking @requireAuth
  }

  type BookingEquipment {
    bookingId: Int!
    booking: Booking!
    equipment: Equipment!
    equipmentId: Int!
  }
  input BookingEquipmentInput {
    equipmentId: Int!
    equipmentName: String!
    equipmentCategory: String!
  }

  input CreateBookingInput {
    startTime: DateTime!
    endTime: DateTime!
    userId: Int!
    producerName: String!
    producerEmail: String!
    directorName: String!
    projectName: String!
    extraComments: String!
    equipments: [BookingEquipmentInput!]!
  }

  input UpdateBookingInput {
    startTime: DateTime
    endTime: DateTime
    userId: Int
    producerName: String
    producerEmail: String
    directorName: String
    projectName: String
    extraComments: String
    equipments: [BookingEquipmentInput!]
  }

  type Mutation {
    createBooking(input: CreateBookingInput!): Booking! @requireAuth
    updateBooking(id: Int!, input: UpdateBookingInput!): Booking! @requireAuth
    deleteBooking(id: Int!): Booking! @requireAuth
  }
`
