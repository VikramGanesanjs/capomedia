export const schema = gql`
  type Video {
    id: Int!
    title: String!
    description: String
    vimeoUrl: String!
    createdAt: DateTime!
    credits: String!
    category: String!
    featured: Boolean!
  }

  type Query {
    videos: [Video!]! @skipAuth
    video(id: Int!): Video @skipAuth
    videosByCategory(category: String!): [Video!]! @skipAuth
  }

  input CreateVideoInput {
    title: String!
    description: String
    vimeoUrl: String!
    credits: String!
    category: String!
  }

  input UpdateVideoInput {
    title: String
    description: String
    vimeoUrl: String
    credits: String
    category: String!
  }

  type Mutation {
    createVideo(input: CreateVideoInput!): Video! @requireAuth
    updateVideo(id: Int!, input: UpdateVideoInput!): Video! @requireAuth
    deleteVideo(id: Int!): Video! @requireAuth
  }
`
