import { createNextHandler } from "@ts-rest/serverless/next";
import { HealthContract } from "./health.contract";
import packageJson from "../../../../package.json" assert { type: "json" };
import {
  HealthyApiStatusSchema,
  ServiceStatusSchema,
  UnhealthyApiStatusSchema,
} from "@/src/rest/health.schema";
import { getHealthCacheControlHeader } from "@/src/config/cache-control-header";
import { handleZodError } from "@/src/rest/zod-error-handler";

const handler = createNextHandler(
  HealthContract,
  {
    health: async ({}, res) => {
      // evaluate overall status code
      const status: number = 200;

      // check client services
      // TODO: add google gemini service
      const googleGeminiStatus: ServiceStatusSchema = {
        name: "Google Gemini (Dummy)",
        status: 200,
        version: "unknown",
        message: "healthy",
      };

      if (googleGeminiStatus.status === 200) {
        // Set cache control header
        res.responseHeaders.set("Cache-Control", getHealthCacheControlHeader());
        const apiStatus: HealthyApiStatusSchema = {
          status: status,
          version: packageJson.version,
          name: packageJson.name,
          description: packageJson.description,
          services: [googleGeminiStatus],
        };
        return { status: 200, body: apiStatus };
      }

      // Set cache control header
      res.responseHeaders.set("Cache-Control", getHealthCacheControlHeader());
      const apiStatus: UnhealthyApiStatusSchema = {
        status: 503,
        error: "Unhealthy services",
        version: packageJson.version,
        name: packageJson.name,
        description: packageJson.description,
        services: [googleGeminiStatus],
      };
      return { status: 503, body: apiStatus };
    },
  },

  {
    jsonQuery: true,
    responseValidation: true,
    handlerType: "app-router",
    errorHandler: handleZodError,
  }
);

export { handler as GET };
