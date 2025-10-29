import { utilities } from "nest-winston";
import winston, { transports } from "winston";
import packageJson from "../../../../package.json";

export const consoleTransport = new transports.Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    utilities.format.nestLike(packageJson.name, {
      colors: true,
      prettyPrint: true,
      processId: true,
      appName: true,
    })
  ),
});
