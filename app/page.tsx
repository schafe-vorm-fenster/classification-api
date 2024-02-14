import { getSwaggerSpec } from "../src/swagger/getSwaggerSpec";
import ReactSwaggerUI from "../src/swagger/ReactSwaggerUI";

export default async function ApiDocsPage() {
  const spec = await getSwaggerSpec();

  return <ReactSwaggerUI spec={spec} />;
}
