import * as z from "zod";
import { oc } from "@orpc/contract";
import { PlanetSchema } from "src/schemas/planet.schema";
import { NewPlanetSchema, UpdatePlanetSchema } from "./planet.contract.schema";
const ERROR_MAP = {
  NOT_FOUND: {
    message: "Planet not found",
  },
};

export const listPlanets = oc
  .route({
    method: "GET",
    path: "/planets",
    summary: "List all planets",
    tags: ["Planets"],
  })
  .output(z.array(PlanetSchema));

export const createPlanet = oc
  .route({
    method: "POST",
    path: "/planets",
    summary: "Create a planet",
    tags: ["Planets"],
  })
  .errors(ERROR_MAP)
  .input(NewPlanetSchema)
  .output(PlanetSchema);

export const findPlanet = oc
  .route({
    method: "GET",
    path: "/planets/{id}",
    summary: "Find a planet",
    tags: ["Planets"],
  })
  .errors(ERROR_MAP)
  .input(PlanetSchema.pick({ id: true }))
  .output(PlanetSchema);

export const updatePlanet = oc
  .route({
    method: "PUT",
    path: "/planets/{id}",
    summary: "Update a planet",
    tags: ["Planets"],
  })
  .errors(ERROR_MAP)
  .input(UpdatePlanetSchema)
  .output(PlanetSchema);
