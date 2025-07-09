from fastapi import APIRouter, HTTPException
from app.services.note_service import create_note, get_notes_by_contact, delete_note, update_note

router = APIRouter(prefix="/notes", tags=["Notes"])

@router.post("/")
def create_note_endpoint(contact_id: str, content: str):
    try:
        return create_note(contact_id, content)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/contact/{contact_id}")
def list_notes(contact_id: str):
    return get_notes_by_contact(contact_id)

@router.delete("/{note_id}")
def delete_note_endpoint(note_id: str):
    return delete_note(note_id)

@router.patch("/{note_id}")
def update_note_endpoint(note_id: str, update_fields: dict):
    try:
        return update_note(note_id, update_fields)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
