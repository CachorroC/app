# Build context is the repo root (see docker-compose.yaml: context: ./, dockerfile:
# services/memoriales-render/Dockerfile) so this can COPY the .docx templates from
# src/memoriales/templates alongside the service code.
FROM python:3.12-slim AS runner

WORKDIR /app

COPY services/memoriales-render/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY services/memoriales-render/render_service.py ./
COPY src/memoriales/templates/*.docx ./templates/

ENV MEMORIALES_TEMPLATES_DIR=/app/templates

EXPOSE 8787

# 0.0.0.0, not 127.0.0.1: this must be reachable from the `app` container over the
# Docker network. It stays private because the compose service has no `ports`/`expose`
# to the host and is never routed through the cloudflared tunnel — only containers on
# the same internal Docker network (i.e. `app`) can reach it.
CMD ["uvicorn", "render_service:app", "--host", "0.0.0.0", "--port", "8787"]
