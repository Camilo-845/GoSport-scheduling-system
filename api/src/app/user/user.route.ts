import { Router } from "express";

class User_Route {
  public apiRouteUser: Router;
  constructor() {
    this.apiRouteUser = Router();
    this.myRoutes();
  }
  private myRoutes() {}
}
const userRoute = new User_Route();
export default userRoute.apiRouteUser;
