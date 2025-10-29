import { JSON_SCHEMA_REGISTRY } from "@orpc/zod/zod4";
import { NewUserSchema, UserSchema } from "../../schemas/user.schema";

JSON_SCHEMA_REGISTRY.add(NewUserSchema, {
  examples: [
    {
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
    },
  ],
});

JSON_SCHEMA_REGISTRY.add(UserSchema, {
  examples: [
    {
      id: "1",
      name: "John Doe",
      email: "john@doe.com",
    },
  ],
});
