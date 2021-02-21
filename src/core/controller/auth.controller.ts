import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models";

export class AuthController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const doc: IUser = <IUser>request.body;
      const user = await new User(doc).save();
      response.status(201).json({ message: "User created", user });
    } catch (error) {
      next({ message: "Register error", error });
    }
  }

  async signIn(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = request.body;
      const user = await User.findByCredentials({ email, password });
      const token = user.generateToken();
      response.status(200).json({ message: "Successfully loged in", token });
    } catch (error) {
      next({ message: "Sign in error", error });
    }
  }
}
