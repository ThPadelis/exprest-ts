import express, { Application, json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { Logger } from "../utils";

export class BaseMiddleware {
  static get configuration() {
    const app: Application = express();

    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(cors());
    app.use(helmet());
    app.use(morgan("combined", { stream: Logger.stream }));

    return app;
  }
}
