import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import dotenv from "dotenv";
import apiRutaAuth from "../../app/auth/auth.route";
import createHttpError, { HttpError } from "http-errors";
import apiRouteUser from "../../app/user/user.route";
import apiRouteSport from "../../app/sport/sport.route";

dotenv.config({
  path: ".env",
});

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.chargeConfiguration();
    this.exposeEndPoint();
  }

  public exposeEndPoint() {
    this.app.use("/api/auth", apiRutaAuth);
    this.app.use("/api/user", apiRouteUser);
    this.app.use("/api/sport", apiRouteSport);

    this.app.use(async (_req, _res, next) => {
      next(createHttpError.NotFound());
    });

    this.app.use(
      (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
        if (err.status) {
          res.status(err.status);
        } else {
          res.status(500);
          console.error(err);
        }
        res.send({
          error: {
            status: err.status || 500,
            message: err.message,
          },
        });
      },
    );
  }

  public chargeConfiguration() {
    this.app.set("PORT", process.env.PORT);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    // Tamaño máximo de archivo
    this.app.use(express.json({ limit: "50mb" }));
    // Para que soporte la cantidad de caracteres URL

    this.app.use(express.urlencoded({ extended: true }));
  }

  public iniciar(): void {
    this.app.listen(this.app.get("PORT"), () => {
      console.log(`Escuchando en el puerto ${this.app.get("PORT")}`);
    });
  }
}

export default Server;
