import { Planet } from "src/schemas/planet.schema";
import { NewPlanet, UpdatePlanet } from "./planet.contract.schema";
import { User } from "src/schemas/user.schema";
import { planets } from "./planet.mock";

export class PlanetService {
  list(): Planet[] {
    return planets;
  }

  find(id: number): Planet | undefined {
    return planets.find((planet) => planet.id === id);
  }

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
