import { UserInput } from "./../TypeDefs/User";
import { GraphQLFloat, GraphQLID, GraphQLString } from "graphql";
import { Notes } from "../../Entities/Notes";
import { NoteType } from "../TypeDefs/Note";
import { checkAuth } from "../../util/check-auth";
import { MessageType } from "../TypeDefs/Messages";

export const CREATE_NOTE = {
  type: NoteType,
  args: {
    description: { type: GraphQLString },
    timestamp: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, context: any) {
    const { timestamp, description } = args;
    const user: any = checkAuth(context);
    try {
      const res = await Notes.insert({ timestamp, description, user: user.id });
      return { id: res.generatedMaps[0].id, ...args, user: user };
    } catch (error) {
      throw new Error(error);
    }
  },
};

export const DELETE_NOTE = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    await Notes.delete(id);

    return { successful: true, message: "DELETE WORKED" };
  },
};
