import config from 'config';
import { log } from '../utils/logger';

const clientURL = config.get<string>("clientURL");

export const allowedOrigins = [
  clientURL,
  "http://localhost:3000",
];

log.info(allowedOrigins);
