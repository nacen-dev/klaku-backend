import mongoose from "mongoose";
import config from "config";
import { log } from "./logger";

export const connectToDB = async () => {
  const dbURI = config.get<string>("dbURI");
  try {
    await mongoose.connect(dbURI);
    log.info("Database connection established");
  } catch (error) {
    log.info(`Error connecting to the database ${error}`);
    process.exit(1);
  }
};
