import { Module } from "@nestjs/common";
import { onError, ORPCModule } from "@orpc/nest";
import { config } from "../../config";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { WinstonModule } from "nest-winston";
import { logger } from "../../lib/logger/logger";
import { PlanetModule } from "../planet/planet.module";

@Module({
  imports: [
    WinstonModule.forRoot({
      instance: logger,
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
    PlanetModule,
  ],
})
export class AppModule {}
