import { Notes } from "./../../Entities/Notes";
import { GraphQLFloat, GraphQLList } from "graphql";
import { NoteType } from "../TypeDefs/Note";

export const GET_ALL_NOTES = {
  type: new GraphQLList(NoteType),
  args: {
    userId: {
      type: GraphQLFloat,
    },
  },

  resolve(parents: any, args: any) {
    const userId = args.userId;
    return Notes.find({ relations: ["user"] });
  },
};
