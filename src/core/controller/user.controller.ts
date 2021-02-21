import { NextFunction, Request, Response } from "express";
import { User } from "../models";

export class UserController {
  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await User.find();
      const totalUsers = users.length;
      return response
        .status(200)
        .json({ message: `Found ${totalUsers} users`, users });
    } catch (error) {
      return next(error);
    }
  }

  async getOne(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const user = await User.findOne({ _id: id });

      if (!user)
        response.status(400).json({
          message: "Unable to find user",
          details: `There is no user with such an id`,
        });
      else return response.status(200).json({ message: "Found user", user });
    } catch (error) {
      return next(error);
    }
  }

  async updateOne(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const user = await User.findOne({ _id: id });

      if (!user)
        return response.status(400).json({
          message: "Unable to find user",
          details: `There is no user with such an id`,
        });

      const updatedValues = request.body;
      // TODO: Add validator here

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { $set: updatedValues },
        { new: true }
      );
      return response
        .status(200)
        .json({ message: "User updated", user: updatedUser });
    } catch (error) {
      return next(error);
    }
  }

  async deleteOne(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const user = await User.findOne({ _id: id });

      if (!user)
        return response.status(400).json({
          message: "Unable to find user",
          details: `There is no user with such an id`,
        });

      const deletedUser = await User.findOneAndDelete(
        { _id: id },
        { rawResult: true }
      );
      return response
        .status(200)
        .json({ message: "User deleted", user: deletedUser });
    } catch (error) {
      return next(error);
    }
  }
}
