import { z } from "zod";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const configSchema = z.object({
  nest: z.object({
    port: z.number(),
  }),
});

const templatedConfig: z.infer<typeof configSchema> = {
  nest: {
    port: Number(process.env.PORT) || 3000,
  },
};

export const config = configSchema.parse(templatedConfig);
