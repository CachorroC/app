"""render_service.py — localhost docx renderer using your existing docxtpl/Jinja engine.

Run:  uvicorn render_service:app --host 127.0.0.1 --port 8787
Deps: pip install fastapi uvicorn docxtpl
Bind to 127.0.0.1 only — this must never be publicly reachable.
"""
import io
from pathlib import Path

from docxtpl import DocxTemplate
from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel

TEMPLATES = Path(__file__).parent / "templates"

# Allowlist: client-supplied ids can never become arbitrary file paths.
ALLOWED: dict[str, str] = {
    "aporta-liquidacion": "memorial-aporta-liquidacion-template.docx",
    "notificacion": "memorial-notificacion-template.docx",
}

DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
app = FastAPI(title="memoriales-render")


class RenderRequest(BaseModel):
    templateId: str
    context: dict  # already validated + formatted by the Next server action


@app.get("/health")
def health() -> dict:
    return {"ok": True}


@app.post("/render")
def render(req: RenderRequest) -> Response:
    filename = ALLOWED.get(req.templateId)
    if filename is None:
        raise HTTPException(status_code=404, detail="Plantilla no encontrada")

    path = TEMPLATES / filename
    if not path.is_file():
        raise HTTPException(status_code=500, detail="Archivo de plantilla ausente")

    doc = DocxTemplate(str(path))
    try:
        doc.render(req.context)
    except Exception as exc:  # jinja/undefined/etc.
        raise HTTPException(status_code=422, detail=f"Error al renderizar: {exc}")

    buffer = io.BytesIO()
    doc.save(buffer)
    return Response(content=buffer.getvalue(), media_type=DOCX_MIME)
