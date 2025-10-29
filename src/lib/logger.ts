import { createLogger, transports } from "winston";
import { ecsFormat } from "@elastic/ecs-winston-format";
import packageJson from "../../package.json";

export const logger = createLogger({
  format: ecsFormat({
    apmIntegration: true,
    serviceName: packageJson.name,
    serviceVersion: packageJson.version,
    serviceEnvironment: process.env.NODE_ENV,
  }),
  transports: [new transports.Console()],
});
