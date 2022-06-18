import "dotenv/config";
import express from "express";
import config from "config";
import { connectToDB } from "./utils/connectToDB";
import { log } from "./utils/logger";
import { indexRouter } from "./routes";
import { deserializeUser } from "./middleware/deserializeUser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./options/corsOptions";

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(deserializeUser);

app.use(indexRouter);

const PORT = config.get("port");

app.listen(PORT, () => {
  log.info(`App started at ${PORT}`);

  connectToDB();
});
