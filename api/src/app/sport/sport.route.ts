import { Router } from "express";
import { verifyToken } from "../auth/helpers/jwt_helper";
import sportController from "./sport.controller";

class Sport_Route {
  public apiRouteSport: Router;

  constructor() {
    this.apiRouteSport = Router();
    this.myRoutes();
  }

  private myRoutes(): void {
    // Obtener todos los deportes
    this.apiRouteSport.get("/", verifyToken, sportController.getAllSports);

    // Crear un nuevo deporte
    this.apiRouteSport.post("/", verifyToken, sportController.createSport);

    // Obtener un deporte por su ID
    this.apiRouteSport.get("/:id", verifyToken, sportController.getSportById);

    // Actualizar un deporte por su ID
    this.apiRouteSport.put("/:id", verifyToken, sportController.updateSport);

    // Eliminar un deporte por su ID
    this.apiRouteSport.delete("/:id", verifyToken, sportController.deleteSport);
  }
}

const sportRoute = new Sport_Route();
export default sportRoute.apiRouteSport;
