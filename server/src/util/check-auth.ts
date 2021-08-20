import { SECRET_KEY } from "./../config";
import jwt from "jsonwebtoken";

export const checkAuth = (context: any) => {
  const authHeader = context.request.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new Error("Invalid/Expired Token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authentication header must be provided");
};
