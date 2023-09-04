import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { getLogger } from "../../logging/log-util";
import { OpenAiClassification } from "./openAiClassification.types";
import { classifyByOpenAiPromt } from "./classifyByOpenAi.promt";

export const classifyByOpenAi = async (
  content: object
): Promise<OpenAiClassification | null> => {
  const log = getLogger("classifyByOpenAi");

  // setup axios-cache-interceptor
  // TODO: define a proper cache maybe by mongoose?
  const axios = setupCache(Axios);

  // combine promt and content
  const fullChatPromt: string =
    classifyByOpenAiPromt.join("\n\n") + JSON.stringify(content);

  // build request body
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
        ) as OpenAiClassification;
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
      return null;
    });
};
