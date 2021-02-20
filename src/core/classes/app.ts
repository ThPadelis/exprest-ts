import express, { Application } from "express";
import { BaseMiddleware } from "../middlewares";
import { BaseRouter } from "../routes";
import { environment } from "../utils";
import { Database } from "./index";

export class App {
  app: Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.connectDatabase();
    this.startServer();
  }

  private setMiddlewares() {
    // Base middlewares
    this.app.use(BaseMiddleware.configuration);
    // Route middlewares
    this.app.use(BaseRouter.routes);
  }

  private connectDatabase() {
    Database.connect();
  }

  private startServer() {
    this.app.listen(environment.port, () => {
      console.log(
        `Server is up and running on ${environment.host}:${environment.port}`
      );
    });
  }
}
