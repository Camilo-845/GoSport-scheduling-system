import { NextFunction, Request, Response } from "express";
import pool from "../../config/connection/dbConnection";
import { SQL_RESERVA } from "./booking.sql";
import { ZodError } from "zod";
import { bookingCreateSchema } from "./booking.validator";
import {
  BookingAdapter,
  BookingObjectAdapter,
  DbBookingResponse,
} from "../../adapters/booking.adapter";

class BookingController {
  public async getBookingsByCourtId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const data = await pool.manyOrNone(
        SQL_RESERVA.GET_RESERVATIONS_BY_COURT_ID,
        id,
      );
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  public async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = bookingCreateSchema.safeParse(req.body);
      if (!parsed.success) {
        throw parsed.error;
      }
      const booking = BookingObjectAdapter(parsed.data as BookingAdapter);
      const result = await pool.one<DbBookingResponse>(
        SQL_RESERVA.CREATE_RESERVATION,
        booking.toArray(),
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
  public async deleteBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await pool.none(SQL_RESERVA.DELETE_RESERVATION, id);
      res.status(200).send({ result: "ok" });
    } catch (error) {
      next(error);
    }
  }
}

const bookingController = new BookingController();
export default bookingController;
