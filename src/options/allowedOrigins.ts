import config from 'config';

const clientURL = config.get<string>("clientURL");

export const allowedOrigins = [
  clientURL,
  "http://localhost:3000",
];
