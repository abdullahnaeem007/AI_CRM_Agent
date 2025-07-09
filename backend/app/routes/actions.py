from fastapi import APIRouter, Request, HTTPException
from app.services.action_executer import handle_action

router = APIRouter(prefix="/actions", tags=["Actions"])

@router.post("/execute")
async def execute_actions(request: Request):
    data = await request.json()
    actions = data.get("actions", [])
    results = []

    for action in actions:
        try:
            result = handle_action(action)
            results.append({"status": "success", "result": result})
        except Exception as e:
            results.append({"status": "error", "error": str(e)})

    return {"results": results}
