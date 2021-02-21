import { connect as dbConnect } from "mongoose";
import { environment } from "../utils/environment";

export class Database {
  static async connect() {
    try {
      await dbConnect(environment.database_connection_string, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log({
        message: "Database Info",
        details: "Connected to database successfully",
      });
    } catch (error) {
      console.log({
        message: "Database Error",
        details: error,
      });
    }
  }
}
