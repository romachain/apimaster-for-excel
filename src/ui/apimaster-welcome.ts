/**
 * APIMaster onboarding overlay.
 *
 * Shown on first run (or whenever no API key is set). A single input: the
 * user's APIMaster key. The gateway + models are already seeded, so saving the
 * key is all that's needed to start.
 */

import {
  APIMASTER_BRAND,
  APIMASTER_KEYS_URL,
} from "../apimaster-config.js";
import { ensureApimasterProvider, setApimasterApiKey } from "../auth/apimaster-seed.js";
import type { CustomProvidersStoreLike } from "../auth/custom-gateways.js";
import { setActiveProviders } from "../compat/model-selector-patch.js";
import { collectCustomProviderRuntimeInfo } from "../auth/custom-gateways.js";
import { createOverlayDialog, closeOverlayById } from "./overlay-dialog.js";
import { WELCOME_LOGIN_OVERLAY_ID } from "./overlay-ids.js";
import { showToast } from "./toast.js";

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

export async function showApimasterWelcome(
  customProviders: CustomProvidersStoreLike,
): Promise<void> {
  // Make sure the gateway + models exist before the key is saved.
  await ensureApimasterProvider(customProviders);

  closeOverlayById(WELCOME_LOGIN_OVERLAY_ID);

  return new Promise<void>((resolve) => {
    const dialog = createOverlayDialog({
      overlayId: WELCOME_LOGIN_OVERLAY_ID,
      cardClassName: "pi-welcome-card pi-overlay-card pi-overlay-card--m",
    });

    let settled = false;
    dialog.addCleanup(() => {
      if (settled) return;
      settled = true;
      resolve();
    });

    const titleId = `${WELCOME_LOGIN_OVERLAY_ID}-title`;

    const logo = el("div", "pi-welcome-logo");
    logo.textContent = "AM";

    const title = el("h2", "pi-welcome-title");
    title.id = titleId;
    title.textContent = APIMASTER_BRAND;

    const subtitle = el("p", "pi-welcome-subtitle");
    subtitle.textContent = "Enter your APIMaster key to get started";

    const intro = el("p", "pi-welcome-intro");
    intro.textContent =
      "An AI agent that reads your spreadsheet, makes changes, and does the research — powered by APIMaster.";

    const label = el("p", "pi-welcome-section-title");
    label.textContent = "APIMaster API key";

    const input = el("input", "pi-welcome-key-input");
    input.type = "password";
    input.placeholder = "sk-...";
    input.autocomplete = "off";
    input.spellcheck = false;

    const saveButton = el("button", "pi-welcome-custom-gateway");
    saveButton.type = "button";
    saveButton.textContent = "Save & start";

    const getKeyLink = el("a");
    getKeyLink.href = APIMASTER_KEYS_URL;
    getKeyLink.target = "_blank";
    getKeyLink.rel = "noopener noreferrer";
    getKeyLink.textContent = "Don't have a key? Get one at apimaster.ai →";

    const hint = el("p", "pi-welcome-proxy__hint");
    hint.append(getKeyLink);

    const save = async (): Promise<void> => {
      const key = input.value.trim();
      if (key.length === 0) {
        showToast("Please enter your APIMaster key.");
        input.focus();
        return;
      }

      saveButton.disabled = true;
      try {
        await setApimasterApiKey(customProviders, key);

        // Refresh active providers so the model selector + runtime pick it up.
        const all = await customProviders.getAll();
        const info = collectCustomProviderRuntimeInfo(all);
        setActiveProviders(info.providerNames);
        document.dispatchEvent(new CustomEvent("pi:providers-changed"));

        showToast("APIMaster connected — try “Explain this workbook”.", 3200);
        dialog.close();
      } catch (error: unknown) {
        console.warn("[apimaster] Failed to save key:", error);
        showToast("Couldn't save the key. Please try again.");
        saveButton.disabled = false;
      }
    };

    saveButton.addEventListener("click", () => void save());
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        void save();
      }
    });

    dialog.card.replaceChildren(logo, title, subtitle, intro, label, input, saveButton, hint);
    dialog.overlay.setAttribute("aria-labelledby", titleId);

    dialog.mount();
    requestAnimationFrame(() => input.focus());
  });
}
