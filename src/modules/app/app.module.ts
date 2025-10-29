import { Module } from "@nestjs/common";
import { AuthController } from "../auth/auth.controller";
import { PlanetController } from "../planet/planet.controller";
import { PlanetService } from "../planet/planet.service";
import { onError, ORPCModule } from "@orpc/nest";
import { config } from "../../config";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { WinstonModule } from "nest-winston";
import { logger } from "../../lib/logger/logger";

@Module({
  imports: [
    WinstonModule.forRoot({
      instance: logger,
    }),

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
  ],
  controllers: [AuthController, PlanetController],
  providers: [PlanetService],
})
export class AppModule {}
