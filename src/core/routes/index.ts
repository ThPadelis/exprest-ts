import express, { Application, NextFunction, Request, Response } from "express";
import { AuthRouter } from "./auth.routes";

export class BaseRouter {
  static get routes() {
    const app: Application = express();

    // app.get("/", (request, response, next) => {
    //   return response.status(200).json({ message: "Hello, World!" });
    // });

    // Auth routes
    app.use("/api/auth", new AuthRouter().routes);

    // 404
    app.use("*", (request, response, next) => {
      return response.status(404).json({ message: "Not exists" });
    });

    app.use(
      (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        response.status(500).json({ message: "Error handler", error });
      }
    );

    return app;
  }
}
