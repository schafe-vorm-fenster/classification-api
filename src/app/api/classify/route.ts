import { createNextHandler } from "@ts-rest/serverless/next";
import { getLogger } from "@/src/logging/logger";
import { handleZodError } from "@/src/rest/zod-error-handler";

import { HttpError } from "http-errors";
import { ApiErrorSchema } from "@/src/rest/error.schema";
import { ApiClassify } from "@/src/logging/loggerApps.config";
import { ClassifyContract } from "./classify.contract";
import {
  ClassificationSchema,
  ClassifySuccessfulSchema,
} from "./classify.schema";
import { classify } from "@/src/clients/google-gemini-api/classify";
import {
  getDataCacheControlHeader,
  getErrorCacheControlHeader,
} from "@/src/config/cache-control-header";

const log = getLogger(ApiClassify.classify);

const handler = createNextHandler(
  ClassifyContract,
  {
    classify: async ({ body }, res) => {
      try {
        // TODO. implement

        const classification: ClassificationSchema = await classify(body);

        res.responseHeaders.set("Cache-Control", getDataCacheControlHeader());
        return {
          status: 200,
          body: {
            status: 200,
            timestamp: new Date().toISOString(),
            data: classification,
          } as ClassifySuccessfulSchema,
        };
      } catch (error: unknown) {
        const httpCode = error instanceof HttpError ? error.status : 500;
        log.error(
          { status: httpCode, message: (error as Error).message },
          "retrieving an event failed"
        );

        res.responseHeaders.set("Cache-Control", getErrorCacheControlHeader());
        return {
          status: (httpCode as 404) || 500,
          body: {
            status: (httpCode as 404) || 500,
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
