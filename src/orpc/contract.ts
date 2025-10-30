import {
  createPlanet,
  findPlanet,
  listPlanets,
  updatePlanet,
} from "../modules/planet/planet.contract";

export const contract = {
  planet: {
    list: listPlanets,
    create: createPlanet,
    find: findPlanet,
    update: updatePlanet,
  },
};
