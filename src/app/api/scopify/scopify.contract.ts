import { initContract } from "@ts-rest/core";

import { z } from "zod";
import { ApiErrorSchema } from "@/src/rest/error.schema";
import { ScopifyQuerySchema, ScopifySuccessfulSchema } from "./scopify.schema";

const c = initContract();

export const ScopifyContract = c.router({
  scopify: {
    method: "POST",
    path: "/api/scopify",
    body: ScopifyQuerySchema,
    responses: {
      200: ScopifySuccessfulSchema,
      400: ApiErrorSchema,
      500: ApiErrorSchema,
    },
    headers: z.object({
      "Sheep-Token": z.string().optional(),
    }),
    summary: "Scopify a json object",
    description: "Scopify a json object based on the given data.",
  },
});
