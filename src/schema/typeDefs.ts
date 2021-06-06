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

  type Response {
    message: String
  }

  # Signup
  input SignupInput {
    name: String!
    password: String!
    role: Role!
  }

  # Signin
  input SigninInput {
    name: String!
    password: String!
  }

  type SigninResponse {
    accessToken: String!
  }

  # Queries
  type Query {
    all: Response!
    userProtected: Response!
    adminOnly: Response!
  }

  # Mutations
  type Mutation {
    signup(input: SignupInput!): Response!
    signin(input: SigninInput!): SigninResponse!
    logout: Response!
  }
`;
