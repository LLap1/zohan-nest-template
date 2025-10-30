import { logger } from "src/lib/logger/logger";
import { root } from "./contracts/root";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { createORPCClient, onError } from "@orpc/client";
import { JsonifiedClient } from "@orpc/openapi-client";
import { ContractRouterClient } from "@orpc/contract";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { RequestValidationPlugin } from "@orpc/contract/plugins";

const link = new OpenAPILink(root, {
  url: "http://localhost:3000",
  interceptors: [
    onError((error) => {
      logger.error(error);
    }),
  ],
  plugins: [new RequestValidationPlugin(root)],
});

export const client: JsonifiedClient<ContractRouterClient<typeof root>> =
  createORPCClient(link);

export const tanstackQueryClient = createTanstackQueryUtils(client);
