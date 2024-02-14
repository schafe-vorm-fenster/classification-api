import getUuidByString from "uuid-by-string";
import { getLogger } from "../../logging/log-util";
import packageJson from "../../package.json" assert { type: "json" };
import { localCache, remoteDatabaseCache } from "./cacheManager";

/**
 * Use a two layer cache.
 * @param query: any
 * @returns any
 */
export const twoLayerCache = async (
  operation: any,
  cluster: string,
  query: object
): Promise<any> => {
  const log = getLogger("twoLayerCache");

  try {
    const cacheKey =
      "classification-api_" +
      packageJson.version +
      "_" +
      cluster +
      "_" +
      getUuidByString(JSON.stringify(query));

    log.debug({ cacheKey: cacheKey }, "Check local cache.");
    return localCache.wrap(cacheKey, function () {
      try {
        log.debug({ cacheKey: cacheKey }, "Check remote cache.");
        return remoteDatabaseCache.wrap(cacheKey, function () {
          log.info({ cacheKey: cacheKey }, "Fetch original data.");
          return operation(query);
        });
      } catch (error: Error | any) {
        log.error(error, error?.message);
        throw error;
      }
    });
  } catch (error: Error | any) {
    log.error(error, error?.message);
    throw error;
  }
};
