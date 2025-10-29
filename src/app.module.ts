import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { PlanetController } from "./planet/planet.controller";
import { PlanetService } from "./planet/planet.service";
import { OpenAPIService } from "./open-api/open-api.service";
import { onError, ORPCModule } from "@orpc/nest";
import { config } from "./config";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    ORPCModule.forRoot({
      interceptors: [
        onError((error) => {
          console.error(error);
        }),
      ],
      eventIteratorKeepAliveInterval: 5000, // 5 seconds
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: () => config,
    }),
    OpenAPIService,
  ],
  controllers: [AuthController, PlanetController],
  providers: [PlanetService, OpenAPIService],
})
export class AppModule {}
