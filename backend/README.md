# Pathfinder Backend

Express API for the Pathfinder.io MVP.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
```

## API Routes

- `GET /api/health`
- `GET /api/roadmaps`
- `GET /api/roadmaps/:slug`
- `POST /api/recommendations`

## AI Engine

The AI boundary lives in `src/services/ai/ai-engine.ts`.

For now, `AI_PROVIDER=mock` uses explainable recommendation logic. Later, this file can call OpenAI or Anthropic without changing frontend components or route handlers.
