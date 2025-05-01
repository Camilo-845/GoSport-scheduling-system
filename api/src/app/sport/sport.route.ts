import { Router } from "express";
import { verifyToken } from "../auth/helpers/jwt_helper";
import sportController from "./sport.controller";

class Sport_Route {
  public apiRouteSport: Router;
  constructor() {
    this.apiRouteSport = Router();
    this.myRoutes();
  }
  private myRoutes() {
    this.apiRouteSport.get("/", verifyToken, sportController.getAllSports);
    this.apiRouteSport.post("/", verifyToken, sportController.createSport);
  }
}

const sportRoute = new Sport_Route();
export default sportRoute.apiRouteSport;
