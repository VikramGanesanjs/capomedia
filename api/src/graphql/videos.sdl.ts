export const schema = gql`
  type Video {
    id: Int!
    title: String!
    description: String
    vimeoUrl: String!
    createdAt: DateTime!
    credits: String!
  }

  type Query {
    videos: [Video!]! @requireAuth
    video(id: Int!): Video @requireAuth
  }

  input CreateVideoInput {
    title: String!
    description: String
    vimeoUrl: String!
    credits: String!
  }

  input UpdateVideoInput {
    title: String
    description: String
    vimeoUrl: String
    credits: String
  }

  type Mutation {
    createVideo(input: CreateVideoInput!): Video! @requireAuth
    updateVideo(id: Int!, input: UpdateVideoInput!): Video! @requireAuth
    deleteVideo(id: Int!): Video! @requireAuth
  }
`
