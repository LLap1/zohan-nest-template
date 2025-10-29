import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { apiReference } from "@scalar/nestjs-api-reference";
import { config } from "./config";
import { logger } from "./lib/logger/logger";
import { WinstonModule } from "nest-winston";
import { generateOpenAPI } from "./open-api/open-api";
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });

  const spec = await generateOpenAPI();

  app.use(
    "/docs",
    apiReference({
      content: spec,
    })
  );

  app.listen(config.nest.port);
}

bootstrap();
