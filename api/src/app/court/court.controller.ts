import { NextFunction, Request, Response } from "express";
import pool from "../../config/connection/dbConnection";
import { ZodError } from "zod";
import { SQL_COURT } from "./court.sql";
import { courtCreateSchema } from "./helpers/validation.schema";
import {
  CourtAdapter,
  CourtObjectAdapter,
  DbCourtResponse,
} from "../../adapters/court.adapter";
import createHttpError from "http-errors";

class CourtController {
  public async getAllCourts(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await pool.manyOrNone(SQL_COURT.GET_ALL_COURTS);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  public async createCourt(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = courtCreateSchema.safeParse(req.body);
      if (!parsed.success) {
        throw parsed.error;
      }

      const court = CourtObjectAdapter(parsed.data as CourtAdapter);
      const result = await pool.one<DbCourtResponse>(
        SQL_COURT.CREATE_COURT,
        court.toArray(),
      );
      res.status(200).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).send(error.format());
      } else {
        next(error);
      }
    }
  }

  public async updateCourt(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const parsed = courtCreateSchema.safeParse(req.body);
      if (!parsed.success) {
        throw parsed.error;
      }

      const court = CourtObjectAdapter(parsed.data as CourtAdapter);
      const result = await pool.one<DbCourtResponse>(SQL_COURT.UPDATE_COURT, [
        id,
        ...court.toArray(),
      ]);
      res.status(200).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).send(error.format());
      } else {
        next(error);
      }
    }
  }

  public async getCourtById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await pool.oneOrNone(SQL_COURT.GET_COURT_BY_ID, id);
      if (!data) {
        throw createHttpError.NotFound("Court not found");
      }
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }

  public async deleteCourt(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await pool.none(SQL_COURT.DELETE_COURT, id);
      res.status(200).send({ message: "Court deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

const courtController = new CourtController();
export default courtController;
