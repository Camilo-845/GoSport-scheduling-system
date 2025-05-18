import { Router } from "express";
import { verifyToken } from "../auth/helpers/jwt_helper";
import eventController from "./event.controller";

class Event_Route {
  public apiRouteEvent: Router;
  constructor() {
    this.apiRouteEvent = Router();
    this.myRoutes();
  }
  private myRoutes() {
    this.apiRouteEvent.get("/", verifyToken, eventController.getAllEvents);
    this.apiRouteEvent.get(
      "/:id/participants",
      verifyToken,
      eventController.getParticipantsByEventId,
    );
    this.apiRouteEvent.delete(
      "/:id/participants",
      verifyToken,
      eventController.cancelEventParticipation,
    );
    this.apiRouteEvent.post(
      "/:id/participant",
      verifyToken,
      eventController.joinParticipantToEventById,
    );
    this.apiRouteEvent.post("/", verifyToken, eventController.createEvent);
    this.apiRouteEvent.get("/:id", verifyToken, eventController.getEventById);
  }
}

const eventRoute = new Event_Route();
export default eventRoute.apiRouteEvent;
