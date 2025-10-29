import { createLogger } from "winston";
import { consoleTransport } from "./transports/console.transport";

export const logger = createLogger({
  transports: [consoleTransport],
});
