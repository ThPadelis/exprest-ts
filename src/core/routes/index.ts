import express, { Application } from "express";

export class BaseRouter {
  static get routes() {
    const app: Application = express();

    app.get("/", (request, response, next) => {
      return response.status(200).json({ message: "Hello, World!" });
    });

    return app;
  }
}
