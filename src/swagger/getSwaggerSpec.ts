import { createSwaggerSpec } from "next-swagger-doc";
import packageJson from "../../package.json" assert { type: "json" };

export const getSwaggerSpec = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: packageJson.name,
        description: packageJson?.description,
        version: packageJson.version,
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [],
    },
  });
  return spec;
};
