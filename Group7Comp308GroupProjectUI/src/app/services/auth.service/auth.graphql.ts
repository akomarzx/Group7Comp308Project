import { gql } from 'apollo-angular';

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      userId
      username
      accessToken
      role
      interests
      address
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $password: String!
    $role: Role!
    $interests: [String!]!
    $address: String!
  ) {
    register(
      username: $username
      password: $password
      role: $role
      interests: $interests
      address: $address
    ) {
      userId
      username
      accessToken
      role
      interests
      address
    }
  }
`;
