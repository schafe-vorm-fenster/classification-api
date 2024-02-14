import axios from "axios";
import { getLogger } from "../../../logging/log-util";

import { OpenAiPromt, OpenAiQuery } from "../openai.types";

import { TagQuery, TagResponse, Tags } from "./tag.types";

import { RuralEventClassification } from "../../types/api.types";
import { tagPromt } from "./tag.promt";

export const tagByOpenAi = async (
  query: TagQuery
): Promise<TagResponse | null> => {
  const log = getLogger("tagByOpenAi");

  log.debug({ data: query }, "query");

  // combine promt and content
  const dataPromt: OpenAiPromt = {
    role: "user",
    content: JSON.stringify(query),
  };

  log.debug({ data: dataPromt }, "dataPromt");

  // build request body
  const requestBody: OpenAiQuery = {
    model: "gpt-3.5-turbo-1106",
    response_format: {
      type: "json_object",
    },
    seed: 5,
    temperature: 0.2,
    messages: [...tagPromt, dataPromt],
  };

  log.debug({ data: requestBody }, "requestBody");

  // set options for axios auth header
  const requestOptions: object = {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  return (
    (await axios
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
          response.data.choices.length > 0 &&
          response.data.choices[0].message.content.length > 0
        ) {
          // return first choice
          log.info({ data: response.data.choices[0] }, "First choice");

          try {
            const jsonResponse: TagResponse = JSON.parse(
              response.data.choices[0].message.content
            ) as TagResponse;
            if (jsonResponse && jsonResponse.tags) {
              return Promise.resolve(jsonResponse);
            }
          } catch (error) {
            log.error(error);
            return Promise.resolve(null);
          }
        } else {
          log.error(
            "No valid json response from OpenAI.",
            response.data.choices[0]
          );
          return Promise.reject("No valid json response from OpenAI.");
        }
      })
      .catch((error) => {
        log.error(
          {
            data: {
              status: error.response.status,
              message: error.response.statusText,
              openai: error.response?.data,
            },
          },
          "Open AI Error"
        );

        return Promise.reject("Error while classifying by OpenAI.");
      })) || Promise.reject("Unknown Error")
  );
};
