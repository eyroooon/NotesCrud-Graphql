import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
} from "graphql";
import { NoteType } from "./Note";

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

export const UserInput = new GraphQLInputObjectType({
  name: "UserInput",
  fields: () => ({
    id: { type: GraphQLID },
  }),
});
