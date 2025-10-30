import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { apiReference } from "@scalar/nestjs-api-reference";
import { config } from "./config";
import { logger } from "./lib/logger/logger";
import { WinstonModule } from "nest-winston";
import { generateOpenAPIDocument } from "./orpc/docs/open-api.docs";
import { openApiClient } from "./orpc/client";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });

  const document = await generateOpenAPIDocument();

  app.use(
    "/docs",
    apiReference({
      content: document,
    })
  );

  app.listen(config.nest.port).then(async () => {
    const planets = await openApiClient.planet.list();
    console.log(planets);
  });
}

bootstrap();
