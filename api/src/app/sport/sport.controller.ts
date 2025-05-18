import { NextFunction, Request, Response } from "express";
import pool from "../../config/connection/dbConnection";
import { SQL_SPORT } from "./sport.sql";
import { ZodError } from "zod";
import { sportRegisterSchema } from "./helpers/validation.schema";
import { Sport } from "../../models";

class SportController {
  // Obtener todos los deportes
  public async getAllSports(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await pool.manyOrNone(SQL_SPORT.GET_ALL_SPORTS);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  // Crear un nuevo deporte
  public async createSport(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = sportRegisterSchema.safeParse(req.body);
      if (!parsed.success) {
        throw parsed.error;
      }
      const result = await pool.one<Sport>(
        SQL_SPORT.CREATE_SPORT,
        parsed.data.nombre,
      );
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).send(error.format());
      } else {
        next(error);
      }
    }
  }

  // Obtener un deporte por su ID
  public async getSportById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await pool.oneOrNone(SQL_SPORT.GET_SPORT_BY_ID, id);
      if (!data) {
        res.status(404).send({ message: "Sport not found" });
      }
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  public async getCourtsBySportId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const data = await pool.manyOrNone(SQL_SPORT.GET_COURTS_BY_SPORT_ID, id);
      if (!data) {
        res.status(404).send({ message: "Sport not found" });
      }
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  // Actualizar un deporte existente
  public async updateSport(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const parsed = sportRegisterSchema.safeParse(req.body);
      if (!parsed.success) {
        throw parsed.error;
      }
      const result = await pool.one<Sport>(SQL_SPORT.UPDATE_SPORT, [
        id,
        parsed.data.nombre,
      ]);
      if (!result) {
        res.status(404).send({ message: "Sport not found" });
      }
      res.status(200).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).send(error.format());
      } else {
        next(error);
      }
    }
  }

  // Eliminar un deporte
  public async deleteSport(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await pool.oneOrNone(SQL_SPORT.DELETE_SPORT, id);
      if (!result) {
        res.status(404).send({ message: "Sport not found" });
      }
      res.status(200).send({ message: "Sport deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

const sportController = new SportController();
export default sportController;
