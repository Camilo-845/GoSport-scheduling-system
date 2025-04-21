import { Router } from "express";
import { body } from "express-validator";
import authController from "../controller/auth_controller";

class Auth_Route {
  public apiRutaAuth: Router;

  constructor() {
    this.apiRutaAuth = Router();
    this.misRutas();
  }

  private misRutas() {
    // Validaciones para registro
    const registerValidations = [
      body("nombre").notEmpty().withMessage("El nombre es requerido"),
      body("apellido").notEmpty().withMessage("El apellido es requerido"),
      body("email").isEmail().withMessage("Correo electrónico inválido"),
      body("telefono").notEmpty().withMessage("El teléfono es requerido"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),
    ];

    // Validaciones para login
    const loginValidations = [
      body("email").isEmail().withMessage("Correo electrónico inválido"),
      body("password").exists().withMessage("La contraseña es requerida"),
    ];

    this.apiRutaAuth.post(
      "/register",
      registerValidations,
      authController.registerUser,
    );
    this.apiRutaAuth.post("/login", loginValidations, authController.loginUser);
  }
}

const authRoute = new Auth_Route();
export default authRoute.apiRutaAuth;
