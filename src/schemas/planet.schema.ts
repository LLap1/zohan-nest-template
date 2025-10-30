import * as z from "zod";
import { UserSchema } from "./user.schema";

export type Planet = z.infer<typeof PlanetSchema>;

export const PlanetSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.url().optional(),
  creator: UserSchema,
});

