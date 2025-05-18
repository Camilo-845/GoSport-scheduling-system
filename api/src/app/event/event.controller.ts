import { NextFunction, Request, Response } from "express";
import pool from "../../config/connection/dbConnection";
import { SQL_EVENT } from "./event.sql";
import { eventCreateSchema } from "./event.validator";
import {
  DbEventReponse,
  EventAdapter,
  EventObjectAdapter,
} from "../../adapters/event.adapter";
import { ZodError } from "zod";

class EventController {
  public async getAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.payload?.userId;
      const data = await pool.manyOrNone(SQL_EVENT.GET_ALL_EVENTS, userId);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  public async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.payload?.userId;
      const { id } = req.params;
      const data = await pool.oneOrNone(SQL_EVENT.GET_EVENT_BY_ID, [
        userId,
        id,
      ]);
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
      const userId = req.payload?.userId;
      await pool.none(SQL_EVENT.POST_EVENT_PARTICIPANT, [userId, id]);
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
      const userId = req.payload?.userId;
      await pool.none(SQL_EVENT.REMOVE_PARTICIPANT_OF_EVENT, [userId, id]);
      res.status(200).send({ message: "Participant removed Successfully" });
    } catch (error) {
      next(error);
    }
  }

  public async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = eventCreateSchema.safeParse(req.body);
      if (!parsed.success) {
        throw parsed.error;
      }
      const event = EventObjectAdapter(parsed.data as EventAdapter);
      const result = await pool.one<DbEventReponse>(
        SQL_EVENT.CREATE_EVENT,
        event.toArray(),
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
}

const eventController = new EventController();
export default eventController;
