import config from 'config';

const clientURL = config.get<string>("clientURL");

export const allowedOrigins = [
  clientURL
];
