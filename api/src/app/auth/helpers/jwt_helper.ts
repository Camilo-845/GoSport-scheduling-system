import JWT, { JwtPayload } from "jsonwebtoken";
import createHttpError from "http-errors";
import { Response, Request, NextFunction } from "express";

export function signToken(userId: number) {
  return new Promise((resolve, reject) => {
    const payload = {
      userId: userId,
    };
    const secret = process.env.JWT_SECRET || "Top_Secret";
    const expiresIn = Number(process.env.JWT_EXPIRES_IN) || 3600;

    const options: JWT.SignOptions = {
      expiresIn,
      issuer: "gosport.com",
      algorithm: "HS256",
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.error(err.message);
        reject(createHttpError.InternalServerError());
        return;
      }
      resolve(token);
    });
  });
}

export function verifyToken(req: Request, _res: Response, next: NextFunction) {
  if (!req.headers["authorization"]) {
    return next(createHttpError.Unauthorized());
  }
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  JWT.verify(token, process.env.JWT_SECRET || "Top_Secret", (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createHttpError.Unauthorized(message));
    }
    if (
      typeof payload === "object" &&
      payload !== null &&
      "userId" in payload &&
      typeof (payload as any).userId === "number"
    ) {
      req.payload = payload as JwtPayload & { userId: number };
      return next();
    }
    return next(createHttpError.Unauthorized("Invalid token payload"));
  });
}
