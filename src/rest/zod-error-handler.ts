import { ZodError } from "zod";
import { TsRestResponse } from "@ts-rest/serverless";
import { ApiErrorSchema } from "./error.schema";
import { ApiValidation } from "../logging/loggerApps.config";
import { getLogger } from "../logging/logger";

const log = getLogger(ApiValidation.zod);

export async function handleZodError(err: unknown): Promise<TsRestResponse> {
  if (
    err instanceof ZodError ||
    (typeof err === "object" &&
      err !== null &&
      "statusCode" in err &&
      err.statusCode === 400)
  ) {
    const zodError: ApiErrorSchema = {
      status: 400,
      error: "Validation Error",
      trace: err,
    };
    log.error({ error: zodError }, "An zod validation error occurred");
    return new TsRestResponse(JSON.stringify(zodError), { status: 400 });
  }

  const unknownError: ApiErrorSchema = {
    status: 500,
    error: "Internal Server Error",
    trace: err,
  };
  log.error({ error: unknownError }, "An unknown zod error occurred");
  return new TsRestResponse(JSON.stringify(unknownError), { status: 500 });
}
