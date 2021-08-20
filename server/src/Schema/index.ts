import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "./Queries/User";
import { CREATE_USER, DELETE_USER, SIGN_IN } from "./Mutations/User";
import { GET_ALL_NOTES } from "./Queries/Notes";
import { CREATE_NOTE, DELETE_NOTE } from "./Mutations/Notes";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_USERS,
    getAllNotes: GET_ALL_NOTES,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    createNote: CREATE_NOTE,
    deleteNote: DELETE_NOTE,
    signIn: SIGN_IN,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
