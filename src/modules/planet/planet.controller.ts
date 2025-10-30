import { Controller, Get } from "@nestjs/common";
import { Implement, implement, ORPCError } from "@orpc/nest";
import { contract } from "src/orpc/contract";
import { PlanetService } from "./planet.service";

@Controller()
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Implement(contract.planet.list)
  list() {
    return implement(contract.planet.list).handler(({ input }) => {
      return this.planetService.list();
    });
  }

  @Implement(contract.planet.find)
  find() {
    return implement(contract.planet.find).handler(({ input }) => {
      const planet = this.planetService.find(input.id);

      if (!planet) {
        throw new ORPCError("NOT_FOUND", { message: "Planet not found" });
      }

      return planet;
    });
  }

  @Implement(contract.planet.create)
  create() {
    return implement(contract.planet.create).handler(({ input }) => {
      return this.planetService.create(input);
    });
  }

  @Implement(contract.planet.update)
  update() {
    return implement(contract.planet.update).handler(({ input, errors }) => {
      const planet = this.planetService.find(input.id);

      if (!planet) {
        throw errors.NOT_FOUND({ data: { id: input.id } });
      }

      return this.planetService.update(planet);
    });
  }
}
