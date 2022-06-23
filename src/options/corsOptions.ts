import { CorsOptions } from "cors";
import { log } from "../utils/logger";
import { allowedOrigins } from "./allowedOrigins";

export const corsOptions: CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

log.info(corsOptions)