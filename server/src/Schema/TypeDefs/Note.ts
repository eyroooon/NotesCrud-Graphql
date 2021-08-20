import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
} from "graphql";
import { UserType } from "./User";

export const NoteType = new GraphQLObjectType({
  name: "Note",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    user: {
      type: UserType,
    },
  }),
});
