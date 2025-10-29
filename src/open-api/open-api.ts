import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { contract } from "src/orpc/contract";
import { CredentialSchema, TokenSchema } from "src/schemas/auth.schema";
import {
  NewPlanetSchema,
  PlanetSchema,
  UpdatePlanetSchema,
} from "src/schemas/planet.schema";
import { NewUserSchema, UserSchema } from "src/schemas/user.schema";
import packageJson from "../../package.json";

const openapiGenerator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
});

export async function generateOpenAPI() {
  return openapiGenerator.generate(contract, {
    info: {
      title: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
    },
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    commonSchemas: {
      NewUser: { schema: NewUserSchema },
      User: { schema: UserSchema },
      Credential: { schema: CredentialSchema },
      Token: { schema: TokenSchema },
      NewPlanet: { schema: NewPlanetSchema },
      UpdatePlanet: { schema: UpdatePlanetSchema },
      Planet: { schema: PlanetSchema },
      UndefinedError: { error: "UndefinedError" },
    },
    servers: [{ url: "http://localhost:3000" }],
  });
}
