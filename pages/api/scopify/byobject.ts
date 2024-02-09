import type { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "../../../logging/log-util";
import { RuralEventScope } from "../../../packages/rural-event-categories/src/types/ruralEventScopes";
import { scopifyByOpenAiCached } from "../../../src/openai/scopify/scopifyByOpenAi.cached";
import { OpenAiScopeification } from "../../../src/openai/scopify/openAiScopeification.types";

export type LooseRuralEventScope = RuralEventScope | "unknown";
export interface ScopifyByObjectResponse {
  scope: LooseRuralEventScope;
}

/**
 * @swagger
 * /api/scopify/byobject:
 *   post:
 *     summary: Returns a scopeification for a json object.
 *     description: Based on an incoming json object, a scopeification is returned. Internally the open ai api is with specified prompts is used to get best results.
 *     tags:
 *       - Scopify
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Scopeification typed as RuralEventScope.
 *       400:
 *         description: Missing body or parameters.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No classification found.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScopifyByObjectResponse>
) {
  const log = getLogger("api.scopify.byobject");

  // check if POST request
  if (req.method !== "POST") {
    log.warn("Incoming request method was not POST.");
    return res.status(400).end("Please use a POST request.");
  }

  // check if body has any value
  const body: object = req.body;
  if (!body || typeof body !== "object") {
    log.warn("Incoming request body was empty or not an object.");
    return res.status(400).end("Please provide a json object to scopify.");
  }

  const openAiScopeification: OpenAiScopeification | null =
    await scopifyByOpenAiCached(body);

  // return error if no response
  if (!openAiScopeification) {
    log.warn({ request: body }, "No scope found.");
    return res.status(404).end("No scope found.");
  }

  let mappedScope: LooseRuralEventScope = "unknown"; // default

  // TODO: put mapping into a separate function
  switch (openAiScopeification.relevance) {
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
  }

  // convert from OpenAiClassification to Classification
  const typedResult: ScopifyByObjectResponse = {
    scope: mappedScope as LooseRuralEventScope,
  };

  // store some log infos

  if (!typedResult || !typedResult.scope || typedResult.scope === "unknown") {
    log.error(
      { request: body, response: typedResult },
      "Scopeification was not successful."
    );
  } else {
    log.debug(
      {
        request: body,
        response: typedResult,
      },
      "Scopeification was successful."
    );
  }

  return res.status(200).json(typedResult);
}
