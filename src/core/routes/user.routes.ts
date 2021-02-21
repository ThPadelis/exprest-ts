import { Router } from "express";
import { UserController } from "../controller";

const router: Router = Router();
export class UserRouter {
  private _userCotroller: UserController;

  constructor() {
    this._userCotroller = new UserController();
  }

  get routes() {
    const controller = this._userCotroller;
    router.get("/", controller.getAll);
    router.get("/:id", controller.getOne);
    router.patch("/:id", controller.updateOne);
    router.delete("/:id", controller.deleteOne);
    return router;
  }
}
