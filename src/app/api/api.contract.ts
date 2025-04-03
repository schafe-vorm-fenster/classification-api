import { initContract } from "@ts-rest/core";
import { HealthContract } from "./health/health.contract";
import { ClassifyContract } from "./classify/classify.contract";
import { ScopifyContract } from "./scopify/scopify.contract";

const c = initContract();

export const ApiContract = c.router({
  health: HealthContract,
  classify: ClassifyContract,
  scopify: ScopifyContract,
});
