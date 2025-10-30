import { Planet } from "src/schemas/planet.schema";
import {
  NewPlanet,
  UpdatePlanet,
} from "src/orpc/contracts/planet/planet.contract.schema";
import { planets } from "./planet.mock";
import { Span } from "nestjs-otel";

export class PlanetService {
  @Span("planet.list")
  list(): Planet[] {
    return planets;
  }
  @Span("planet.find")
  find(id: number): Planet | undefined {
    return planets.find((planet) => planet.id === id);
  }
  @Span("planet.create")
  create(newPlanet: NewPlanet): Planet {
    const id = planets.length + 1;
    const imageUrl = newPlanet.image
      ? `https://example.com/cdn/${newPlanet.image.name}`
      : undefined;

    const planet: Planet = {
      creator: newPlanet.creator,
      id,
      name: newPlanet.name,
      description: newPlanet.description,
      imageUrl,
    };

    planets.push(planet);
    return planet;
  }
  @Span("planet.update")
  update(planet: UpdatePlanet): Planet {
    const index = planets.findIndex((p) => p.id === planet.id);

    if (index === -1) {
      throw new Error("Planet not found");
    }

    planets[index] = {
      ...planets[index],
      ...planet,
      imageUrl: planet.image
        ? `https://example.com/cdn/${planet.image.name}`
        : planets[index].imageUrl,
    };

    return planets[index];
  }
}
