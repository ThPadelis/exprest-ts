import express, { Application } from "express";
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

    return app;
  }
}
