import { createNextHandler } from "@ts-rest/serverless/next";
import { getLogger } from "@/src/logging/logger";
import { handleZodError } from "@/src/rest/zod-error-handler";

import { HttpError } from "http-errors";
import { ApiErrorSchema } from "@/src/rest/error.schema";
import { ApiScopify } from "@/src/logging/loggerApps.config";
import { ScopifyContract } from "./scopify.contract";
import { ScopificationSchema, ScopifySuccessfulSchema } from "./scopify.schema";
import { scopify } from "@/src/clients/google-gemini-api/scopify";
import {
  getDataCacheControlHeader,
  getErrorCacheControlHeader,
} from "@/src/config/cache-control-header";

const log = getLogger(ApiScopify.scopify);

const handler = createNextHandler(
  ScopifyContract,
  {
    scopify: async ({ body }, res) => {
      try {
        const scope: ScopificationSchema = await scopify(body);
        res.responseHeaders.set("Cache-Control", getDataCacheControlHeader());
        return {
          status: 200,
          body: {
            status: 200,
            timestamp: new Date().toISOString(),
            data: scope,
          } as ScopifySuccessfulSchema,
        };
      } catch (error: unknown) {
        const httpCode = error instanceof HttpError ? error.status : 500;
        log.error(
          { status: httpCode, message: (error as Error).message },
          "retrieving an event failed"
        );

        res.responseHeaders.set("Cache-Control", getErrorCacheControlHeader());
        return {
          status: (httpCode as 400) || 500,
          body: {
            status: (httpCode as 400) || 500,
            error: (error as Error).message || "Internal Server Error",
          } as ApiErrorSchema,
        };
      }
    },
  },
  {
    jsonQuery: true,
    responseValidation: true,
    handlerType: "app-router",
    errorHandler: handleZodError,
  }
);

export { handler as POST };
