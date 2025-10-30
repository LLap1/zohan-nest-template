import { logger } from "src/lib/logger/logger";
import { contract } from "./contract";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { createORPCClient, onError } from "@orpc/client";
import { JsonifiedClient } from "@orpc/openapi-client";
import { ContractRouterClient } from "@orpc/contract";

export const link = new OpenAPILink(contract, {
  url: "http://localhost:3000",
  interceptors: [
    onError((error) => {
      logger.error(error);
    }),
  ],
});

export const openApiClient: JsonifiedClient<
  ContractRouterClient<typeof contract>
> = createORPCClient(link);
