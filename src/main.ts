import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { apiReference } from "@scalar/nestjs-api-reference";
import { OpenAPIService } from "./open-api/open-api.service";
import { config } from "./config";
import { logger } from "./lib/logger/logger";
import { WinstonModule } from "nest-winston";
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });
  const openAPIService = app.get(OpenAPIService);
  const spec = await openAPIService.spec();
  app.use(
    "/docs",
    apiReference({
      content: spec,
    })
  );
  app.listen(config.nest.port);
}

bootstrap();
