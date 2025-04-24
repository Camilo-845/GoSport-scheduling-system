import { Router } from "express";
import authController from "./auth.controller";

class Auth_Route {
  public apiRutaAuth: Router;

  constructor() {
    this.apiRutaAuth = Router();
    this.misRutas();
  }

  private misRutas() {
    this.apiRutaAuth.post("/register", authController.registerUser);
    this.apiRutaAuth.post("/login", authController.loginUser);
  }
}

const authRoute = new Auth_Route();
export default authRoute.apiRutaAuth;
