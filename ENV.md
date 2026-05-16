# Environment variables

Copy these into `.env.local` (never commit `.env.local`).

## Choose an AI provider

Set `AI_PROVIDER` to one of: `watsonx` | `openai` | `anthropic` | `demo`

### Demo (no API — works immediately)

```env
AI_PROVIDER=demo
```

### OpenAI (or compatible: Groq, Together, etc.)

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
# Optional for Groq:
# OPENAI_BASE_URL=https://api.groq.com/openai/v1
# OPENAI_MODEL=llama-3.3-70b-versatile
```

### Anthropic (Claude)

```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-20250514
```

### IBM watsonx.ai (hackathon / IBM stack)

```env
AI_PROVIDER=watsonx
WATSONX_API_KEY=your_ibm_cloud_api_key
WATSONX_PROJECT_ID=your_project_id
WATSONX_URL=https://jp-tok.ml.cloud.ibm.com
WATSONX_MODEL_ID=ibm/granite-3-8b-instruct
```

IBM Bob is the IDE partner; watsonx powers live generation when `AI_PROVIDER=watsonx`.
