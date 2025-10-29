import { me, signin, signup } from "../modules/auth/auth.contract";
import {
  createPlanet,
  findPlanet,
  listPlanets,
  updatePlanet,
} from "../modules/planet/planet.contract";

export const contract = {
  auth: {
    signup,
    signin,
    me,
  },

  planet: {
    list: listPlanets,
    create: createPlanet,
    find: findPlanet,
    update: updatePlanet,
  },
};
