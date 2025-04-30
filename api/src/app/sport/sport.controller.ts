import { NextFunction, Request, Response } from "express";
import pool from "../../config/connection/dbConnection";
import { SQL_SPORT } from "./sport.sql";

class SportController {
  public async getAllSports(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await pool.manyOrNone(SQL_SPORT.GET_ALL_SPORTS);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
}

const sportController = new SportController();
export default sportController;
