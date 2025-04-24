// types/express/index.d.ts
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      payload?: JwtPayload & { userId: number };
    }
  }
}
