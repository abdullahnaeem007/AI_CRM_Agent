from fastapi import APIRouter, Request
from app.services.assistant_service import parse_instruction

router = APIRouter(prefix="/assistant", tags=["Assistant"])

@router.post("/parse")
async def parse_instruction_endpoint(request: Request):
    body = await request.json()
    instruction = body.get("instruction")

    if not instruction:
        return {"error": "Instruction is required"}

    actions = parse_instruction(instruction)
    return {"actions": actions}