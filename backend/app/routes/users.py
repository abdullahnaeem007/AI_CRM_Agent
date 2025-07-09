from fastapi import APIRouter, HTTPException
from app.services.user_service import create_user, get_users, get_user_by_id
from pydantic import BaseModel

router = APIRouter(prefix="/users", tags=["Users"])

class UserCreate(BaseModel):
    email: str
    name: str

@router.post("/")
def create_user_endpoint(user: UserCreate):
    try:
        return create_user(user.email, user.name)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/")
def list_users():
    return get_users()

@router.get("/{user_id}")
def get_user(user_id: str):
    return get_user_by_id(user_id)
