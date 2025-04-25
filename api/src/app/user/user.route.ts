import { Router } from "express";
import userController from "./user.controller";
import { verifyToken } from "../auth/helpers/jwt_helper";

class User_Route {
  public apiRouteUser: Router;
  constructor() {
    this.apiRouteUser = Router();
    this.myRoutes();
  }
  private myRoutes() {
    this.apiRouteUser.get("/", verifyToken, userController.getUserDetails);
  }
}
const userRoute = new User_Route();
export default userRoute.apiRouteUser;
