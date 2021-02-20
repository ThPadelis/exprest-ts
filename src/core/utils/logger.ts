import { createWriteStream, existsSync, mkdirSync } from "fs";
import { join } from "path";

export class Logger {
  static get stream() {
    const logFolder = join(__dirname, "..", "..", "logs");
    const date: Date = new Date();
    const loggerFileName = `${date.toISOString().split("T")[0]}-combined.log`;
    if (!existsSync(logFolder)) mkdirSync(logFolder);

    return createWriteStream(join(logFolder, loggerFileName), { flags: "a" });
  }
}
