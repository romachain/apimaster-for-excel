/**
 * Seed + manage the pre-configured APIMaster gateway provider.
 *
 * Ships the APIMaster OpenAI-compatible gateway with all chat models so users
 * only need to supply their API key. The provider record matches what the
 * manual custom-gateway flow produces, so the model selector and runtime treat
 * it identically.
 */

import type { Api, Model } from "@earendil-works/pi-ai";

import {
  APIMASTER_BASE_URL,
  APIMASTER_MAX_TOKENS,
  APIMASTER_MODELS,
  APIMASTER_PROVIDER_ID,
  APIMASTER_PROVIDER_NAME,
} from "../apimaster-config.js";
import type { CustomProvidersStoreLike } from "./custom-gateways.js";

function buildModels(): Model<"openai-completions">[] {
  return APIMASTER_MODELS.map((m) => ({
    id: m.id,
    name: m.name,
    api: "openai-completions",
    provider: APIMASTER_PROVIDER_NAME,
    baseUrl: APIMASTER_BASE_URL,
    reasoning: m.reasoning,
    input: ["text"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: m.contextWindow,
    maxTokens: Math.min(APIMASTER_MAX_TOKENS, m.contextWindow),
  }));
}

/**
 * Ensure the APIMaster provider exists with the current model catalog.
 * Preserves any API key the user already entered.
 */
export async function ensureApimasterProvider(
  store: CustomProvidersStoreLike,
): Promise<void> {
  let existingApiKey: string | undefined;
  try {
    const existing = await store.get(APIMASTER_PROVIDER_ID);
    existingApiKey = existing?.apiKey;
  } catch {
    // ignore — treat as not yet seeded
  }

  await store.set({
    id: APIMASTER_PROVIDER_ID,
    name: APIMASTER_PROVIDER_NAME,
    type: "openai-completions",
    baseUrl: APIMASTER_BASE_URL,
    apiKey: existingApiKey,
    models: buildModels() as Model<Api>[],
  });
}

export async function getApimasterApiKey(
  store: CustomProvidersStoreLike,
): Promise<string> {
  try {
    const provider = await store.get(APIMASTER_PROVIDER_ID);
    return (provider?.apiKey ?? "").trim();
  } catch {
    return "";
  }
}

export async function setApimasterApiKey(
  store: CustomProvidersStoreLike,
  apiKey: string,
): Promise<void> {
  const trimmed = apiKey.trim();
  const existing = await store.get(APIMASTER_PROVIDER_ID);

  if (existing) {
    await store.set({ ...existing, apiKey: trimmed.length > 0 ? trimmed : undefined });
    return;
  }

  // Not seeded yet — seed then set the key.
  await ensureApimasterProvider(store);
  const seeded = await store.get(APIMASTER_PROVIDER_ID);
  if (seeded) {
    await store.set({ ...seeded, apiKey: trimmed.length > 0 ? trimmed : undefined });
  }
}
