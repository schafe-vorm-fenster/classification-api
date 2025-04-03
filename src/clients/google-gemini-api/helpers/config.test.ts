import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getGoogleGeminiApiConfig,
  getGoogleGeminiApiHost,
  getGoogleGeminiApiToken,
} from "./config";

describe("Google Gemini API Config", () => {
  const mockEnv = {
    GOOGLE_GEMINI_API_HOST: "https://gemini-api.example.com",
    GOOGLE_GEMINI_API_HOST_TOKEN: "test-token-123",
  };

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...mockEnv };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getGoogleGeminiApiHost", () => {
    it("should return the host when properly configured", () => {
      expect(getGoogleGeminiApiHost()).toBe("https://gemini-api.example.com/");
    });

    it("should throw error when host is not configured", () => {
      delete process.env.GOOGLE_GEMINI_API_HOST;
      expect(() => getGoogleGeminiApiHost()).toThrow(
        "GOOGLE_GEMINI_API_HOST is not properly configured"
      );
    });

    it("should throw error when host is invalid URL", () => {
      process.env.GOOGLE_GEMINI_API_HOST = "invalid-url";
      expect(() => getGoogleGeminiApiHost()).toThrow();
    });
  });

  describe("getGoogleGeminiApiToken", () => {
    it("should return the token when properly configured", () => {
      expect(getGoogleGeminiApiToken()).toBe("test-token-123");
    });

    it("should throw error when token is not configured", () => {
      delete process.env.GOOGLE_GEMINI_API_HOST_TOKEN;
      expect(() => getGoogleGeminiApiToken()).toThrow(
        "GOOGLE_GEMINI_API_HOST_TOKEN is not properly configured"
      );
    });
  });

  describe("getGoogleGeminiApiConfig", () => {
    it("should return both host and token when properly configured", () => {
      expect(getGoogleGeminiApiConfig()).toEqual({
        host: "https://gemini-api.example.com/",
        token: "test-token-123",
      });
    });

    it("should throw error when either config is missing", () => {
      delete process.env.GOOGLE_GEMINI_API_HOST;
      expect(() => getGoogleGeminiApiConfig()).toThrow();
    });
  });
});
