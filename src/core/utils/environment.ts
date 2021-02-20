import { config as dotenv } from "dotenv";

// Load environment variables from .env
dotenv();

const env = process.env.NODE_ENV || "development";
const configurations = {
  base: {
    env,
    name: process.env.APP_NAME || "exprest-ts",
    host: process.env.APP_HOST || "http://127.0.0.1",
    port: process.env.APP_PORT || 8080,
  },
  production: {
    database_connection_string:
      process.env.PRODUCTION_DATABASE_STRING ||
      "mongodb://localhost:27017/exprest-ts",
  },
  development: {
    database_connection_string:
      process.env.DEVELOPMENT_DATABASE_STRING ||
      "mongodb://localhost:27017/exprest-ts",
  },
};

export const environment = Object.assign(
  configurations.base,
  env === "development"
    ? { ...configurations.development }
    : { ...configurations.production }
);
