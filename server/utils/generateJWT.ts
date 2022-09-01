import jwt from "jsonwebtoken";
import { IUserData } from "../types";

export const generateJwtToken = (user: IUserData) => {
  return jwt.sign(user, process.env.JWT_SECRET || "", {
    expiresIn: process.env.JWT_MAX_AGE,
    algorithm: "HS256",
  });
};
