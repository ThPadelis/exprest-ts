import express, { Application, NextFunction, Request, Response } from "express";
import { isAuthorized } from "../guards";
import { AuthRouter } from "./auth.routes";
import { UserRouter } from "./user.routes";

export class BaseRouter {
  static get routes() {
    const app: Application = express();

    app.get("/api", (request, response, next) => {
      response.status(200).json({ message: "API is up and running" });
    });

    // Auth routes
    app.use("/api/auth", new AuthRouter().routes);

    // Secure routes
    app.use("/api/users", [isAuthorized], new UserRouter().routes);

    app.use(
      (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        return response.status(500).json({ message: "Error handler", error });
      }
    );

    // 404
    app.use("*", (request, response, next) => {
      return response.status(404).json({ message: "Not exists" });
    });

    return app;
  }
}
