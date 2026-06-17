/**
 * APIMaster for Excel — central product configuration.
 *
 * This add-in is a rebrand of the MIT-licensed pi-for-excel that ships with the
 * APIMaster gateway pre-configured. End users only enter their APIMaster key.
 */

export const APIMASTER_BRAND = "APIMaster for Excel";

/** OpenAI-compatible gateway base URL (the SDK appends /chat/completions). */
export const APIMASTER_BASE_URL = "https://apimaster.ai/v1";

/** Where users get a key — shown on the onboarding screen. */
export const APIMASTER_KEYS_URL = "https://apimaster.ai";

/** Stable id + display name for the seeded custom provider. */
export const APIMASTER_PROVIDER_ID = "pi-openai-gateway:apimaster";
export const APIMASTER_PROVIDER_NAME = "APIMaster";

export interface ApimasterModelDef {
  id: string;
  name: string;
  contextWindow: number;
  /** Whether to expose the thinking-level selector (sends reasoning_effort). */
  reasoning: boolean;
}

/**
 * Models exposed to users. Keep the intended default first — pickDefaultModel
 * falls back to the first custom model when no built-in provider rule matches.
 * Source: GET https://apimaster.ai/v1/models (chat models only; image models excluded).
 * reasoning: true for models verified to accept reasoning_effort on the gateway.
 */
export const APIMASTER_MODELS: ApimasterModelDef[] = [
  { id: "claude-opus-4-8", name: "Claude Opus 4.8", contextWindow: 200_000, reasoning: true },
  { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", contextWindow: 200_000, reasoning: true },
  { id: "claude-opus-4-7", name: "Claude Opus 4.7", contextWindow: 200_000, reasoning: true },
  { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", contextWindow: 200_000, reasoning: true },
  { id: "gpt-5.5", name: "GPT-5.5", contextWindow: 200_000, reasoning: true },
  { id: "gpt-5.4", name: "GPT-5.4", contextWindow: 200_000, reasoning: true },
  { id: "kimi-k2.7-code", name: "Kimi K2.7 Code", contextWindow: 200_000, reasoning: true },
  { id: "MiniMax-M3", name: "MiniMax M3", contextWindow: 200_000, reasoning: true },
];

export const APIMASTER_DEFAULT_MODEL_ID = "claude-opus-4-8";

/** Conservative output cap; clamped to each model's context window. */
export const APIMASTER_MAX_TOKENS = 8_192;
