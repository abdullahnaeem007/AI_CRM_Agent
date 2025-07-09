from app.services.note_service import create_note, delete_note
from app.services.reminder_service import create_reminder, mark_reminder_done, delete_reminder, update_reminder
from app.services.contact_service import get_contacts_by_user, create_contact, update_contact, delete_contact

def handle_action(action: dict):
    action_type = action.get("type")

    if action_type == "add_note":
        contact_name = action.get("contact_name")
        note_text = action.get("note")
        contact_id = resolve_contact_id(contact_name)
        return create_note(contact_id, note_text)

    elif action_type == "delete_note":
        note_id = action.get("note_id")
        return delete_note(note_id)

    elif action_type == "add_reminder":
        contact_name = action.get("contact_name")
        contact_id = resolve_contact_id(contact_name)
        return create_reminder(contact_id, action.get("remind_at"), action.get("message"))

    elif action_type == "update_reminder":
        reminder_id = action.get("reminder_id")
        update_fields = action.get("update_fields", {})
        return update_reminder(reminder_id, update_fields)

    elif action_type == "mark_reminder_done":
        reminder_id = action.get("reminder_id")
        return mark_reminder_done(reminder_id)

    elif action_type == "delete_reminder":
        reminder_id = action.get("reminder_id")
        return delete_reminder(reminder_id)

    elif action_type == "add_contact":
        # expects: name, email, phone, company, user_id
        return create_contact(
            action.get("user_id", 1),  # Replace with actual user id logic
            action.get("name"),
            action.get("email"),
            action.get("phone"),
            action.get("company")
        )

    elif action_type == "update_contact":
        contact_name = action.get("contact_name")
        contact_id = resolve_contact_id(contact_name)
        update_fields = action.get("update_fields", {})
        return update_contact(contact_id, update_fields)

    elif action_type == "delete_contact":
        contact_name = action.get("contact_name")
        contact_id = resolve_contact_id(contact_name)
        return delete_contact(contact_id)

    raise Exception(f"Unknown action type: {action_type}")

def resolve_contact_id(name: str) -> str:
    contacts = get_contacts_by_user(1)  # Replace with actual user id
    for contact in contacts:
        if contact["name"].lower() == name.lower():
            return contact["id"]
    raise Exception(f"Contact '{name}' not found")
