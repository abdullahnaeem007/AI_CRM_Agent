from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import users, contacts, notes, reminders, assistant, actions


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(contacts.router)
app.include_router(notes.router)
app.include_router(reminders.router)
app.include_router(assistant.router)
app.include_router(actions.router)
