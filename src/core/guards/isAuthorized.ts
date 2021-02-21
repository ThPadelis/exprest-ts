import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { environment } from "../utils";

export const isAuthorized = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization)
    return response
      .status(401)
      .json({ message: "Autorization failed", details: "Token is missing" });

  const token = authorization.replace("Bearer ", "");

  const isVerified = verify(token, environment.secret);
  if (isVerified) next();
  else
    return response
      .status(401)
      .json({ message: "Autorization failed", details: "Token is not valid" });
};
