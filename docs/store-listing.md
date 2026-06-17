# APIMaster for Excel — AppSource / Partner Center listing

Copy-paste content for the Microsoft Partner Center (AppSource) Office add-in submission.
English is the primary store language. Character limits noted are Partner Center maximums.

---

## Basic info

- **Name (DisplayName):** APIMaster for Excel
- **App ID (manifest `<Id>`):** 4246b585-7c15-4170-a72f-5caecf44f271
- **Host application:** Excel
- **Primary category:** Productivity
- **Secondary category:** Data analytics
- **Privacy policy URL:** https://apimaster-for-excel.vercel.app/privacy
- **Terms of use URL:** https://apimaster-for-excel.vercel.app/terms
- **Support URL:** https://apimaster.ai
- **Help/Support email:** support@apimaster.ai
- **Manifest to upload:** manifest.prod.xml (served at https://apimaster-for-excel.vercel.app/manifest.prod.xml)

---

## Short description (summary) — max 100 chars

> Chat with your spreadsheet. An AI agent that reads, edits, and explains Excel — powered by APIMaster.

(98 chars — alternate, 79 chars:)

> AI assistant for Excel — read, edit, and explain your spreadsheet using your APIMaster key.

---

## Long description — max ~4000 chars

APIMaster for Excel puts a powerful AI assistant right in your spreadsheet. Ask in plain language and it reads your workbook, makes the changes you want, writes formulas, fixes errors, and explains what’s going on — without leaving Excel.

Bring your own APIMaster key and choose from leading models — Claude Opus, Claude Sonnet, GPT‑5, DeepSeek, Kimi, MiniMax and more — all through a single gateway. Switch models any time to match the task and your budget.

**What it can do**
• Understand your workbook — reads every sheet, its structure, formulas, and named ranges, then gives you a clear overview.
• Edit by instruction — write values, fill formulas down a column, reshape ranges, and clean up data.
• Format with words — apply number formats, styles, and conditional formatting by describing what you want.
• Explain & debug — explain any formula in plain language and trace precedents/dependents to find errors.
• Quality‑check — scan a workbook for broken or circular logic, inconsistent assumptions, and formatting issues.
• Think deeper when needed — turn on reasoning for harder analysis, or keep it fast for quick edits.
• Stay in control — choose Auto mode (changes applied immediately) or Confirm mode (approve each change). Automatic backups are created before edits.

**Why APIMaster for Excel**
• One key, many models — no juggling multiple provider accounts.
• Your key, your data — your API key is stored locally on your device; spreadsheet content goes directly from your browser to the APIMaster gateway and the model you choose. There is no application backend collecting your data.
• Fast and native — a clean sidebar built for Excel.

**Getting started**
1. Install the add-in and open it from the Home tab (the APIMaster button).
2. Enter your APIMaster API key (get one at apimaster.ai).
3. Pick a model and ask — for example: “Explain this workbook”, “Fill B2:B100 with =A2*1.1”, or “Find and fix formula errors”.

Note: An APIMaster account and API key are required. Use of the AI models is subject to the APIMaster terms and the applicable model providers’ policies. AI output may be inaccurate — always review changes; keeping backups is recommended.

---

## Search keywords — up to 7

AI, assistant, Claude, GPT, formulas, automation, data analysis

---

## Screenshot captions (provide 1–5 images, 1366×768 PNG/JPG)

1. “Ask in plain language — APIMaster reads your workbook and acts.”
2. “Write values and fill formulas across ranges in one instruction.”
3. “Explain any formula and trace its dependencies.”
4. “Choose your model — Claude, GPT‑5, DeepSeek and more — with one key.”
5. “Auto or Confirm mode, with automatic backups before edits.”

Screenshot tips: capture the sidebar open in Excel showing (a) the onboarding/key screen, (b) a completed edit like the “填入 45” flow, (c) the model picker showing the APIMaster models, (d) the thinking-level selector.

---

## “What’s new” / release notes (first version)

First release. Chat with your spreadsheet using your APIMaster key: read, edit, format, and explain — with multi-model support (Claude, GPT‑5, DeepSeek, Kimi, MiniMax).

---

## Testing notes for Microsoft reviewers (Partner Center “Notes for certification”)

To test the add-in, a valid APIMaster API key is required (the reviewer can obtain one at https://apimaster.ai). Steps:
1. Open the add-in from the Excel Home tab → “Open APIMaster”.
2. On the welcome screen, paste an APIMaster API key and click “Save & start”.
3. The default model is Claude Opus 4.8. Type a prompt such as “Put Hello in A1” to verify the agent reads and edits the workbook.

The add-in stores the API key locally in the web view; spreadsheet content is sent from the client directly to https://apimaster.ai to generate responses. There is no separate application backend.
