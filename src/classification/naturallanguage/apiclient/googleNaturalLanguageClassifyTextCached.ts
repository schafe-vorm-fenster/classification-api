import {
  googleNaturalLanguageClassifyText,
  GoogleNaturalLanguageClassifyTextResponse,
  GoogleNaturalLanguageClassifyTextQuery,
} from "./googleNaturalLanguageClassifyText";
import getUuidByString from "uuid-by-string";
import { localCache, remoteDatabaseCache } from "../../../cache/cachemanager";
import { getLogger } from "../../../../logging/log-util";

/**
 * Use a two layer cache.
 * @param query: GoogleNaturalLanguageClassifyTextQuery
 * @returns GoogleNaturalLanguageClassifyTextResponse
 */
export const memoryCached = async (
  query: GoogleNaturalLanguageClassifyTextQuery
): Promise<GoogleNaturalLanguageClassifyTextResponse> => {
  const log = getLogger("googlenaturallanguage.calssifytext");
  try {
    const cacheKey =
      "googlenaturallanguage_classifytext_" + getUuidByString(query.content);
    log.debug(`[Cache] Check local cache for ${cacheKey}.`);
    return localCache.wrap(cacheKey, function () {
      try {
        log.debug(`[Cache] Check remote cache for ${cacheKey}.`);
        return remoteDatabaseCache.wrap(cacheKey, function () {
          log.info(`[Cache] Fetch original data for ${cacheKey}.`);
          return googleNaturalLanguageClassifyText(query);
        });
      } catch (error: Error | any) {
        log.error(error, error?.message);
        throw error;
      }
    });
  } catch (error: Error | any) {
    log.error(error, error?.message);
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
