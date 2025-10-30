import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { NestInstrumentation } from "@opentelemetry/instrumentation-nestjs-core";

const traceExporter = new ConsoleSpanExporter();

// Create SDK instance with comprehensive configuration
const node = new NodeSDK({
  traceExporter,
  instrumentations: [new NestInstrumentation()],
});

// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on("SIGTERM", () => {
  node
    .shutdown()
    .then(
      () => console.log("SDK shut down successfully"),
      (err) => console.log("Error shutting down SDK", err)
    )
    .finally(() => process.exit(0));
});

export default node;
