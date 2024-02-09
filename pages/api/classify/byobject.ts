import type { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "../../../logging/log-util";
import { OpenAiClassification } from "../../../src/openai/classify/openAiClassification.types";
import { RuralEventCategoryId } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { RuralEventScope } from "../../../packages/rural-event-categories/src/types/ruralEventScopes";
import { classifyByOpenAiCached } from "../../../src/openai/classify/classifyByOpenAi.cached";
import { RuralEventClassification } from "../../../src/types/api.types";
import { OpenAiExtension } from "../../../src/openai/extend/openAiExtension.types";
import { extendByOpenAi } from "../../../src/openai/extend/extendByOpenAi";

/**
 * @swagger
 * /api/classify/byobject:
 *   post:
 *     summary: Returns a classification for a json object.
 *     description: Based on an incoming json object, a classification is returned. For logic open ai api is used to get best results.
 *     tags:
 *       - Classify
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Classification typed as RuralEventClassification.
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

  // check if body has enough content, if too short than use classifyByOpenAiCached before
  let bodyExtension: OpenAiExtension | null = null;
  if (JSON.stringify(body).length < 150) {
    log.warn("Incoming request body was too short.");
    bodyExtension = await extendByOpenAi(body);
    log.debug({ body, bodyExtension }, "Try to extend the content.");
  }

  const openAiClassification: OpenAiClassification | null =
    await classifyByOpenAiCached({
      ...body,
      details: bodyExtension,
    });

  // return error if no response
  if (!openAiClassification) {
    log.warn({ request: body }, "No classification found.");
    return res.status(404).end("No classification found.");
  }

  // convert from OpenAiClassification to Classification
  const typedResult: RuralEventClassification = {
    category: openAiClassification.category as unknown as RuralEventCategoryId,
    tags: openAiClassification.tags || [],
  };

  // store some log infos
  log.debug({
    request: body,
    response: typedResult,
  });

  if (!typedResult || !typedResult.category) {
    log.error(
      { request: body, response: typedResult },
      "Classification was not successful."
    );
  }

  return res.status(200).json(typedResult || { category: "unknown", tags: [] });
}
