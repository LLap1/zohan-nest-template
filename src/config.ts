import { z } from "zod";

const ENVSchema = z.object({
  PORT: z.string().default("3000").transform(Number),
});

export const config = ENVSchema.parse(process.env);
