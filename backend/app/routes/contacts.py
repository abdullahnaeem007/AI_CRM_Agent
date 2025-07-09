from fastapi import APIRouter, HTTPException
from app.services.contact_service import create_contact, get_contacts_by_user, get_contact_by_id, update_contact, delete_contact

router = APIRouter(prefix="/contacts", tags=["Contacts"])

@router.post("/")
def create_contact_endpoint(user_id: str, name: str, email: str, phone: str, company: str):
    try:
        return create_contact(user_id, name, email, phone, company)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/user/{user_id}")
def get_contacts(user_id: str):
    return get_contacts_by_user(user_id)

@router.get("/{contact_id}")
def get_contact(contact_id: str):
    return get_contact_by_id(contact_id)

@router.patch("/{contact_id}")
def update_contact_endpoint(contact_id: str, update_fields: dict):
    try:
        return update_contact(contact_id, update_fields)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{contact_id}")
def delete_contact_endpoint(contact_id: str):
    try:
        return delete_contact(contact_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
