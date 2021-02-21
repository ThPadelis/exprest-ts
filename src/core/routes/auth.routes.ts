import { Router } from "express";
import { AuthController } from "../controller";

const router: Router = Router();
export class AuthRouter {
  private _authCotroller: AuthController;

  constructor() {
    this._authCotroller = new AuthController();
  }

  get routes() {
    const controller = this._authCotroller;
    router.post("/register", controller.create);
    router.post("/sign-in", controller.signIn);
    return router;
  }
}
