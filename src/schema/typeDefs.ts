import { gql } from "apollo-server-express";

export default gql`
  enum Role {
    ADMIN
    USER
  }

  # User Type
  type User {
    id: ID!
    name: String!
    password: String!
    role: Role!
  }

  # signup
  input SignupInput {
    name: String!
    password: String!
    role: Role!
  }

  # Queries
  type Query {
    hello: String!
  }

  type SignupResponse {
    message: String!
  }

  # Mutations
  type Mutation {
    signup(input: SignupInput): SignupResponse!
  }
`;
