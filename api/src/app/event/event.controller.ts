import { NextFunction, Request, Response } from "express";
import pool from "../../config/connection/dbConnection";
import { ZodError } from "zod";
import { SQL_EVENT } from "./event.sql";
import { eventJoinParticipantSchema } from "./helpers/validation.schema";

class EventController {
  public async getAllEvents(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await pool.manyOrNone(SQL_EVENT.GET_ALL_EVENTS);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  public async getParticipantsByEventId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const data = await pool.manyOrNone(SQL_EVENT.GET_EVENT_PARTICIPANTS, id);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  public async joinParticipantToEventById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const parsed = eventJoinParticipantSchema.safeParse(req.body);
      if (!parsed.success) {
        throw parsed.error;
      }
      await pool.none(SQL_EVENT.POST_EVENT_PARTICIPANT, [
        parsed.data?.id_usuario,
        id,
      ]);
      res.status(200).send({ message: "Participantant added Successfully" });
    } catch (error) {
      next(error);
    }
  }
  public async cancelEventParticipation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const parsed = eventJoinParticipantSchema.safeParse(req.body);
      if (!parsed.success) {
        throw parsed.error;
      }
      await pool.none(SQL_EVENT.REMOVE_PARTICIPANT_OF_EVENT, [
        parsed.data.id_usuario,
        id,
      ]);
      res.status(200).send({ message: "Participant removed Successfully" });
    } catch (error) {
      next(error);
    }
  }
}

const eventController = new EventController();
export default eventController;
