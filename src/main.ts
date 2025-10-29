import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { apiReference } from "@scalar/nestjs-api-reference";
import { OpenAPIService } from "./open-api/open-api.service";
import { config } from "./config";
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
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
