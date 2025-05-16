import { Router } from "express";
import { verifyToken } from "../auth/helpers/jwt_helper";
import bookingController from "./booking.controller";

class Booking_Route {
  public apiRouteBooking: Router;
  constructor() {
    this.apiRouteBooking = Router();
    this.myRoutes();
  }
  private myRoutes() {
    this.apiRouteBooking.get(
      "/court/:id",
      verifyToken,
      bookingController.getBookingsByCourtId,
    );
    this.apiRouteBooking.post(
      "/",
      verifyToken,
      bookingController.createBooking,
    );
  }
}

const bookingRoute = new Booking_Route();
export default bookingRoute.apiRouteBooking;
