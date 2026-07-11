# memoriales-render

Localhost-only FastAPI service that renders `.docx` templates with `docxtpl` (Python/Jinja),
used by the Next.js `generateMemorial` server action. It exists because the real memorial
templates use Jinja control flow (`{% if %}` / `{% for %}`), which the JS `docxtemplater`
library doesn't support.

## Setup

```bash
./setup.sh
```

Creates `.venv/`, installs `requirements.txt`, and freezes `requirements.lock` for
reproducible installs.

## Run (dev)

```bash
.venv/bin/uvicorn render_service:app --host 127.0.0.1 --port 8787 --reload
```

Or via the repo root: `pnpm dev` runs this alongside `next dev` (see `dev:render` script).

Binds to `127.0.0.1` only — this service must never be publicly reachable. No auth is
needed since it's same-host only.

## Environment

- `MEMORIALES_TEMPLATES_DIR` — overrides the templates directory (defaults to the repo's
  `src/memoriales/templates`).

## API

- `GET /health` — `{ ok: true, templatesDir: string }`
- `POST /render` — `{ templateId: string, context: object }` → `.docx` binary response.
  `templateId` must match `^[a-z0-9-]+$` and resolves to `{templatesDir}/{templateId}.docx`.

## Deployment

### Docker Compose + Cloudflare tunnel (how this repo is actually deployed)

The app runs in Docker, exposed to the internet only through a `cloudflared` tunnel
container, both attached to an external Docker network called `internal`
(`docker-compose.yaml`). `memoriales-render` is a second service on that same network:

```yaml
services:
  app:
    # ...
    environment:
      MEMORIALES_RENDER_URL: http://memoriales-render:8787/render
    depends_on:
      - memoriales-render

  memoriales-render:
    build:
      context: ./
      dockerfile: services/memoriales-render/Dockerfile
    networks:
      - internal
    # no `ports`/`expose`, no cloudflared route
```

Key points, all already wired in `docker-compose.yaml` / `Dockerfile`:

- **`MEMORIALES_RENDER_URL` uses the Docker service name (`memoriales-render`), never
  `127.0.0.1`.** Each container has its own loopback interface — `app` and
  `memoriales-render` only see each other via the `internal` network's DNS, at the
  service's container port (`8787`).
- **The service binds `0.0.0.0` inside its container** (see the `Dockerfile`'s `CMD`),
  which is safe here because Docker network isolation — not loopback binding — is what
  keeps it private: it has no `ports:`/`expose:` mapping to the host and is never given a
  `cloudflared` ingress route, so nothing outside the `internal` Docker network (in
  particular, nothing from the internet) can reach it. This is the containerized
  equivalent of the bare-metal "bind 127.0.0.1 only" rule below.
- **Templates are baked into the image at build time** (`Dockerfile` copies
  `src/memoriales/templates/*.docx` in) rather than mounted, since the build context is
  the repo root (`context: ./`, `dockerfile: services/memoriales-render/Dockerfile`) —
  same pattern the main `app` service already uses. Redeploy (rebuild) to pick up new
  or changed templates.

Bring it up with the rest of the stack: `docker compose up -d --build`.

### Bare-metal / systemd (non-Docker self-hosting)

If you're not using Docker, run the venv-based service directly and bind to loopback
only (see [Run (dev)](#run-dev) above), since there's no network isolation to rely on:

```ini
# /etc/systemd/system/memoriales-render.service
[Unit]
Description=Memoriales docx render service
After=network.target

[Service]
WorkingDirectory=/opt/app/services/memoriales-render
Environment=MEMORIALES_TEMPLATES_DIR=/opt/app/src/memoriales/templates
ExecStart=/opt/app/services/memoriales-render/.venv/bin/uvicorn render_service:app --host 127.0.0.1 --port 8787
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
