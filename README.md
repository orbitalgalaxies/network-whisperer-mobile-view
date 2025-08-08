# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/14ab2426-8222-48a5-85f5-737c8ec9a305

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/14ab2426-8222-48a5-85f5-737c8ec9a305) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/14ab2426-8222-48a5-85f5-737c8ec9a305) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

---

## About this app

A lightweight network insights UI built with Vite + React + Tailwind + shadcn-ui. It includes:
- Wi‑Fi scanning and channel insights
- Bluetooth scanning
- Traffic monitoring and advanced metrics pages

## Security and LLM guardrails (frontend)

A minimal LLM-defense layer has been added under `src/lib/llm/` to help mitigate prompt-injection and leakage risks when/if an LLM is integrated later.

Implemented now:
- Heuristics-based risk scoring (inspired by OWASP LLM01): `assessInputRisk()`
- Input normalization/sanitization: `sanitizeInput()`
- Canary token injection and leakage detection: `injectCanary()` + `detectCanaryLeak()`
- One-stop guard wrapper: `guardPrompt()`

Example usage (when wiring an LLM call later):
```ts
import { guardPrompt, detectLeak } from "@/lib/llm";

const { allowed, prompt, report, canary } = guardPrompt(userInput, {
  threshold: 0.6,
  attachCanary: true,
});
if (!allowed) {
  // Block or ask user to rephrase; `report.findings` explains why
  return;
}

// Call your LLM here with `prompt`...
const responseText = await callYourLLM(prompt);

// Detect canary leakage
if (detectLeak(responseText, canary)) {
  // Handle policy violation: mask, log, or drop the response
}
```

Note: No backend or LLM provider is configured yet; this guard is provider-agnostic and ready to wrap any future calls.

## Backend integration “backdoors” (future-ready)

This project intentionally keeps provider choices open. You can integrate any of the following without refactoring the UI:
- Supabase (recommended on Lovable) for auth, DB, storage, Edge Functions, secrets
- AWS (Lambda/API Gateway, Bedrock, DynamoDB/OpenSearch)
- GCP (Cloud Run/Functions, Vertex AI, Firestore/BigQuery)
- Azure (Functions, Azure OpenAI, Cosmos DB/Postgres)
- External Vector DBs (pgvector, Pinecone, Weaviate, Qdrant)
- LLM APIs (OpenAI/Azure OpenAI, Anthropic, Google, Perplexity, Mistral, Bedrock)

Suggested architecture when adding a backend:
- Keep API keys in a server-side secret store (e.g., Supabase Secrets, AWS Secrets Manager). Do not place private keys in the frontend.
- Create a thin API layer (Edge Function/Cloud Function) that receives the guarded prompt, performs server-side validation, and calls the selected provider.
- Add pgvector/Pinecone for similarity checks against a corpus of blocked prompts to strengthen injection detection.

## Optional next steps

- VectorDB memory and similarity defenses: store embeddings of known-bad prompts and compare incoming inputs.
- CI security scanning with Garak: add a job to probe for injection, leakage, toxicity, and jailbreaks.
- Server-side policy engine: fail closed on high-risk prompts; log events for audit.
- Rebuff/heuristics expansion: add LLM-based detection and pattern tuning.

## Secrets management

- If using Supabase (native in Lovable), put provider API keys in Supabase Secrets and read them in Edge Functions.
- If using another platform, store secrets in its managed secret service and expose only server-side endpoints to the frontend.
- For temporary local testing without a backend, prefer user-supplied public keys and store in `localStorage`—not for production.
