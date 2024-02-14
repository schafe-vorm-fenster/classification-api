"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {
  spec: Record<string, any>;
};

/**
 * Wrapper for SwaggerUI component as client side rendering component.
 */
export default function ReactSwaggerUI({ spec }: Props) {
  return <SwaggerUI spec={spec} />;
}
