import express, { Application } from "express";
import { BaseMiddleware } from "../middlewares";
import { BaseRouter } from "../routes";

export class App {
  app: Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.startServer();
  }

  private setMiddlewares() {
    // Base middlewares
    this.app.use(BaseMiddleware.configuration);
    // Route middlewares
    this.app.use(BaseRouter.routes);
  }

  private startServer() {
    this.app.listen(8080, () => {
      console.log(`Server is up and running on http://localhost:8080`);
    });
  }
}
