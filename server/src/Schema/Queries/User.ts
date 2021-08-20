import { GraphQLList, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users";

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  resolve() {
    return Users.find();
  },
};

export const SIGN_IN = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parents: any, args: any) {
    const { username, password } = args;
    return Users.findOne({ username: username, password: password });
  },
};
