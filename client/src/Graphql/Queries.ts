import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  query signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      id
      name
      username
    }
  }
`;

export const GET_ALL_NOTES = gql`
  query getAllNotes {
    getAllNotes {
      id
      description
      timestamp
      user {
        id
        name
      }
    }
  }
`;
