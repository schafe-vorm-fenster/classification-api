import { ClientGoogleGemini } from "@/src/logging/loggerApps.config";
import { ApiConfig, getApiHost, getApiToken } from "../../helpers/config";

// Environment variable names for classification API
const GOOGLE_GEMINI_API_HOST_ENV = "GOOGLE_GEMINI_API_HOST";
const GOOGLE_GEMINI_API_TOKEN_ENV = "GOOGLE_GEMINI_API_HOST_TOKEN";

/**
 * Returns the validated classification API host URL from environment variables
 * @returns The API host URL or throws an error if not configured
 */
export const getGoogleGeminiApiHost = (): string => {
  return getApiHost(GOOGLE_GEMINI_API_HOST_ENV, ClientGoogleGemini.config);
};

/**
 * Returns the validated classification API token from environment variables
 * @returns The API token or throws an error if not configured
 */
export const getGoogleGeminiApiToken = (): string => {
  return getApiToken(GOOGLE_GEMINI_API_TOKEN_ENV, ClientGoogleGemini.config);
};

/**
 * Safe wrapper to get classification API configuration
 * Returns the host and token or null values if either is missing
 * @returns Object containing host and token, or null values if configuration is invalid
 */
export const getGoogleGeminiApiConfig = () => {
  return {
    host: getGoogleGeminiApiHost(),
    token: getGoogleGeminiApiToken(),
  } as ApiConfig;
};
