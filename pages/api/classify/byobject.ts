import type { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "../../../logging/log-util";
import { OpenAiClassification } from "../../../src/openai/openAiClassification.types";
import { RuralEventCategoryId } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { RuralEventScope } from "../../../packages/rural-event-categories/src/types/ruralEventScopes";
import { classifyByOpenAiCached } from "../../../src/openai/classifyByOpenAi.cached";
import { RuralEventClassification } from "../../../src/types/api.types";

/**
 * @swagger
 * /api/classify/byobject:
 *   post:
 *     summary: Returns a classification and a scopification for a json object.
 *     description: Based on an incoming json object, a classification and a scopification is returned. For both the open ai api is used to get best results.
 *     tags:
 *       - Classify
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Classification and scopification typed as RuralEventClassification.
 *       400:
 *         description: Missing body or parameters.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No classification found.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RuralEventClassification>
) {
  const log = getLogger("api.classify.byobject");

  // check if POST request
  if (req.method !== "POST") {
    log.warn("Incoming request method was not POST.");
    return res.status(400).end("Please use a POST request.");
  }

  // check if body has any value
  const body: object = req.body;
  if (!body || typeof body !== "object") {
    log.warn("Incoming request body was empty or not an object.");
    return res.status(400).end("Please provide a json object to classify.");
  }

  const openAiClassification: OpenAiClassification | null =
    await classifyByOpenAiCached(body);

  // return error if no response
  if (!openAiClassification) {
    log.warn({ request: body }, "No classification found.");
    return res.status(404).end("No classification found.");
  }

  let mappedScope: RuralEventScope = "nearby"; // default

  switch (openAiClassification.relevance) {
    case "tight-nearby":
      mappedScope = "nearby";
      break;
    case "formal-municipality":
      mappedScope = "municipality";
      break;
    case "wider-region":
      mappedScope = "region";
      break;
    case "specific-location":
      mappedScope = "community";
      break;
    default:
      mappedScope = "nearby";
  }

  // convert from OpenAiClassification to Classification
  const typedResult: RuralEventClassification = {
    category:
      (openAiClassification.category as unknown as RuralEventCategoryId) ||
      "community-life",
    tags: [],
    scope: (mappedScope as RuralEventScope) || "nearby",
  };

  // store some log infos
  log.debug({
    request: body,
    response: typedResult || { category: "unknown", tags: [], scope: "nearby" },
  });

  return res
    .status(200)
    .json(typedResult || { category: "unknown", scope: "nearby" });
}
