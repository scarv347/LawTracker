# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

## Ask LawTrack AI (local dev)

Ask LawTrack AI is a grounded legal-information chatbot that answers only from verified LawTrack legal records. With no legal data connected yet, it correctly returns the "insufficient evidence" response.

To run locally:

1. Start the Vite dev server: `npm run dev`
2. In another terminal, start the AI server: `npm run dev:server` (listens on port 5175; Vite proxies `/api` to it)

Configure the server by copying `server/.env.example` to `server/.env` and setting `ASU_AIR_API_KEY` and `ASU_AIR_MODEL`. The API key is server-side only and must never be committed or placed in frontend code; `.env` is gitignored. The base URL defaults to `https://openai.rc.asu.edu/v1`.

The backend lives in `server/`, the frontend client in `src/lib/askLawTrack.ts`, and the full endpoint contract is documented in [docs/ask-lawtrack-api.md](docs/ask-lawtrack-api.md).

To connect real legal data, implement the `LegalEvidenceRetriever` interface in `server/retrieval/retriever.ts`. The Firestore-backed implementation swaps in at the one-line swap point without changing the API contract, prompt, or validation.

```
