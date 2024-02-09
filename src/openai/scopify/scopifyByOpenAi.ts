import axios from "axios";
import { getLogger } from "../../../logging/log-util";
import {
  OpenAiQuery,
  OpenAiScopeification,
} from "./openAiScopeification.types";
import { scopifyByOpenAiPromt } from "./scopifyByOpenAi.promt";

export const scopifyByOpenAi = async (
  content: OpenAiQuery
): Promise<OpenAiScopeification | null> => {
  const log = getLogger("scopifyByOpenAi");

  // combine promt and content
  const fullChatPromt: string =
    scopifyByOpenAiPromt.join("\n\n") + JSON.stringify(content);

  // build request body
  // TODO: check out new features for api use and reproducability
  const requestBody: object = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Act as an API. Return JSON only.",
      },
      {
        role: "user",
        content: fullChatPromt,
      },
    ],
  };

  // set options for axios auth header
  const requestOptions: object = {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  return await axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      requestBody,
      requestOptions
    )
    .then((response) => {
      // well, something was returned
      log.debug(response.data);

      // check if response is valid and contains choices[]
      if (
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        // return first choice
        return JSON.parse(
          response.data.choices[0].message.content
        ) as OpenAiScopeification;
      } else {
        log.error(
          "No valid json response from OpenAI.",
          response.data.choices[0]
        );
        throw new Error("No valid response from OpenAI.");
      }
    })
    .catch((error) => {
      log.error(error);
      throw error;
    });
};
