import { Router } from "express";
import authController from "./auth.controller";
import { verifyToken } from "./helpers/jwt_helper";

class Auth_Route {
  public apiRutaAuth: Router;

  constructor() {
    this.apiRutaAuth = Router();
    this.misRutas();
  }

  private misRutas() {
    this.apiRutaAuth.post("/register", authController.registerUser);
    this.apiRutaAuth.post("/login", authController.loginUser);
    this.apiRutaAuth.put(
      "/changePassword",
      verifyToken,
      authController.changePassword,
    );
  }
}

const authRoute = new Auth_Route();
export default authRoute.apiRutaAuth;
