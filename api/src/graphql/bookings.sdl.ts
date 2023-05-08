export const schema = gql`
  type Booking {
    id: Int!
    startTime: DateTime!
    endTime: DateTime!
    equipment: Equipment!
    equipmentId: Int!
    createdAt: DateTime!
  }

  type Query {
    bookings: [Booking!]! @requireAuth
    booking(id: Int!): Booking @requireAuth
  }

  input CreateBookingInput {
    startTime: DateTime!
    endTime: DateTime!
    equipmentId: Int!
  }

  input UpdateBookingInput {
    startTime: DateTime
    endTime: DateTime
    equipmentId: Int
  }

  type Mutation {
    createBooking(input: CreateBookingInput!): Booking! @requireAuth
    updateBooking(id: Int!, input: UpdateBookingInput!): Booking! @requireAuth
    deleteBooking(id: Int!): Booking! @requireAuth
  }
`
