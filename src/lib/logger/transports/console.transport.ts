import { utilities } from "nest-winston";
import winston, { transports } from "winston";
import packageJson from "../../../../package.json";
import { ecsFormat } from "@elastic/ecs-winston-format";

export const consoleTransport = new transports.Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    utilities.format.nestLike(packageJson.name, {
      colors: true,
      prettyPrint: true,
      processId: true,
      appName: true,
    })
  ),
});
