import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
  mutation createNote($description: String!, $timestamp: String!) {
    createNote(description: $description, timestamp: $timestamp) {
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

export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id) {
      message
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($name: String!, $username: String!, $password: String!) {
    createUser(name: $name, username: $username, password: $password) {
      id
      token
      name
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      id
      token
      name
    }
  }
`;
