from fastapi import APIRouter, HTTPException
from app.services.reminder_service import (
    create_reminder,
    get_reminders_by_contact,
    mark_reminder_done,
    delete_reminder,
    update_reminder
)

router = APIRouter(prefix="/reminders", tags=["Reminders"])

@router.post("/")
def create_reminder_endpoint(contact_id: str, remind_at: str, message: str):
    try:
        return create_reminder(contact_id, remind_at, message)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/contact/{contact_id}")
def get_reminders(contact_id: str):
    return get_reminders_by_contact(contact_id)

@router.patch("/{reminder_id}/done")
def complete_reminder(reminder_id: str):
    return mark_reminder_done(reminder_id)

@router.patch("/{reminder_id}")
def update_reminder_endpoint(reminder_id: str, update_fields: dict):
    try:
        return update_reminder(reminder_id, update_fields)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{reminder_id}")
def delete_reminder_endpoint(reminder_id: str):
    return delete_reminder(reminder_id)
