import {
  googleNaturalLanguageClassifyText,
  GoogleNaturalLanguageClassifyTextResponse,
  GoogleNaturalLanguageClassifyTextQuery,
} from "./googleNaturalLanguageClassifyText";
import getUuidByString from "uuid-by-string";
import { localCache, remoteDatabaseCache } from "../../../cache/cachemanager";

/**
 * Use a two layer cache.
 * @param query: GoogleNaturalLanguageClassifyTextQuery
 * @returns GoogleNaturalLanguageClassifyTextResponse
 */
const memoryCached = async (
  query: GoogleNaturalLanguageClassifyTextQuery
): Promise<GoogleNaturalLanguageClassifyTextResponse> => {
  try {
    const cacheKey =
      "googlenaturallanguage_classifytext_" + getUuidByString(query.content);
    console.debug(`[Cache] Check local cache for ${cacheKey}.`);
    return localCache.wrap(cacheKey, function () {
      try {
        console.debug(`[Cache] Check remote cache for ${cacheKey}.`);
        return remoteDatabaseCache.wrap(cacheKey, function () {
          console.info(`[Cache] Fetch original data for ${cacheKey}.`);
          return googleNaturalLanguageClassifyText(query);
        });
      } catch (error) {
        console.error((error as Error).message);
        throw error;
      }
    });
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const googleNaturalLanguageClassifyTextCached = async (
  query: GoogleNaturalLanguageClassifyTextQuery
): Promise<GoogleNaturalLanguageClassifyTextResponse> => {
  if (process.env.DEACTIVATE_CACHE === "true")
    return googleNaturalLanguageClassifyText(query);
  return memoryCached(query);
};
