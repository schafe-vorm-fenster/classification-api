import { initContract } from "@ts-rest/core";

import { z } from "zod";
import { ApiErrorSchema } from "@/src/rest/error.schema";
import {
  ClassifyQuerySchema,
  ClassifySuccessfulSchema,
} from "./classify.schema";

const c = initContract();

export const ClassifyContract = c.router({
  classify: {
    method: "POST",
    path: "/api/classify",
    body: ClassifyQuerySchema,
    responses: {
      200: ClassifySuccessfulSchema,
      400: ApiErrorSchema,
      500: ApiErrorSchema,
    },
    headers: z.object({
      "Sheep-Token": z.string().optional(),
    }),
    summary: "Classify a json object",
    description:
      "Classify a json object based on the given tags, summary, description and/or occurrence.",
  },
});
