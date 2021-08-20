import { GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { MessageType } from "../TypeDefs/Messages";
import { Users } from "../../Entities/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { SECRET_KEY } from "../../config";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name, username, password } = args;
    const hashPassword = await bcrypt.hash(password, 12);

    try {
      const res = await Users.insert({
        name,
        username,
        password: hashPassword,
      });
      const token = jwt.sign(
        {
          id: res.generatedMaps[0].id,
          username: username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      return { id: res.generatedMaps[0].id, name, token, username };
    } catch (error) {
      throw new Error("Username Already Exist");
    }
  },
};

export const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    await Users.delete(id);

    return { successful: true, message: "DELETE WORKED" };
  },
};

export const SIGN_IN = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parents: any, args: any) {
    const { username, password } = args;
    const user = await Users.findOne({
      username: username,
    });

    if (!user) {
      throw new Error("USERNAME DOESNT EXIST");
    }
    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      throw new Error("PASSWORDS DO NOT MATCH!");
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        name: user.name,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return { id: user.id, name: user.name, username: user.username, token };
  },
};
