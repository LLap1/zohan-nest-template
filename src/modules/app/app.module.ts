import { Module } from "@nestjs/common";
import { ORPCModule } from "@orpc/nest";
import { config } from "../../config";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { logger } from "../../lib/logger/logger";
import { PlanetModule } from "../planet/planet.module";
import { OpenTelemetryModule } from "nestjs-otel";

@Module({
  imports: [
    WinstonModule.forRoot({
      instance: logger,
    }),

    ORPCModule.forRoot({
      eventIteratorKeepAliveInterval: 5000, // 5 seconds
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      validate: () => config,
    }),
    OpenTelemetryModule.forRoot({
      metrics: {
        hostMetrics: true, // Includes Host Metrics
        apiMetrics: {
          // @deprecated - will be removed in 8.0 - you should start using the semcov from opentelemetry metrics instead
          enable: true, // Includes api metrics
          defaultAttributes: {
            // You can set default labels for api metrics
            custom: "label",
          },
          ignoreRoutes: ["/favicon.ico"], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
          ignoreUndefinedRoutes: false, //Records metrics for all URLs, even undefined ones
          prefix: "my_prefix", // Add a custom prefix to all API metrics
        },
      },
    }),

    PlanetModule,
  ],
})
export class AppModule {}
