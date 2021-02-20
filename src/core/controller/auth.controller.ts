import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models";

export class AuthController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const doc: IUser = <IUser>request.body;
      const user = await new User(doc).save();
      response.status(201).json({ message: "User created", user });
    } catch (error) {
      console.log({ message: "User error", details: error });
      response.status(400).json({ message: "User error", details: error });
    }
  }
}
