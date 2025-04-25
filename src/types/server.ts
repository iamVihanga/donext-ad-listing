import { PinoLogger } from "hono-pino";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}
