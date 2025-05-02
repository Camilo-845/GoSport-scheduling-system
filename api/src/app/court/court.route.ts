import { Router } from "express";
import { verifyToken } from "../auth/helpers/jwt_helper";
import courtController from "./court.controller";

class Court_Route {
  public apiRouteCourt: Router;
  constructor() {
    this.apiRouteCourt = Router();
    this.myRoutes();
  }
  private myRoutes() {
    this.apiRouteCourt.get("/", verifyToken, courtController.getAllCourts);
    this.apiRouteCourt.post("/", verifyToken, courtController.createCourt);
    this.apiRouteCourt.get("/:id", verifyToken, courtController.getCourtById);
    this.apiRouteCourt.put("/:id", verifyToken, courtController.updateCourt);
    this.apiRouteCourt.delete("/:id", verifyToken, courtController.deleteCourt);
  }
}

const sportRoute = new Court_Route();
export default sportRoute.apiRouteCourt;
