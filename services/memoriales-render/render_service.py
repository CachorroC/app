"""render_service.py — localhost docx renderer using docxtpl/Jinja.

Run:  .venv/bin/uvicorn render_service:app --host 127.0.0.1 --port 8787
Deps: pip install -r requirements.txt
Bind to 127.0.0.1 only — this must never be publicly reachable.
"""
import io
import os
import re
from pathlib import Path

import jinja2
from docxtpl import DocxTemplate
from jinja2 import ChainableUndefined
from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel

ID_RE = re.compile(r"^[a-z0-9-]+$")
DEFAULT_DIR = Path(__file__).resolve().parents[2] / "src" / "memoriales" / "templates"
TEMPLATES_DIR = Path(os.environ.get("MEMORIALES_TEMPLATES_DIR", DEFAULT_DIR)).resolve()
DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

app = FastAPI(title="memoriales-render")


class RenderRequest(BaseModel):
    templateId: str
    context: dict  # already validated + formatted by the Next server action


def _lenient_jinja_env() -> jinja2.Environment:
    return jinja2.Environment(undefined=ChainableUndefined)


@app.get("/health")
def health() -> dict:
    return {"ok": True, "templatesDir": str(TEMPLATES_DIR)}


@app.post("/render")
def render(req: RenderRequest) -> Response:
    if not ID_RE.match(req.templateId):
        raise HTTPException(status_code=400, detail="templateId inválido")

    path = (TEMPLATES_DIR / f"{req.templateId}.docx").resolve()

    if TEMPLATES_DIR not in path.parents:
        raise HTTPException(status_code=400, detail="Ruta no permitida")

    if not path.is_file():
        raise HTTPException(status_code=404, detail="Plantilla no encontrada")

    doc = DocxTemplate(str(path))
    try:
        doc.render(req.context, jinja_env=_lenient_jinja_env())
    except Exception as exc:  # jinja/undefined/etc.
        raise HTTPException(status_code=422, detail=f"Error al renderizar: {exc}")

    buffer = io.BytesIO()
    doc.save(buffer)
    return Response(content=buffer.getvalue(), media_type=DOCX_MIME)
