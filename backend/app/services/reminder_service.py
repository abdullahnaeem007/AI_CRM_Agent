from app.core.config import supabase

def create_reminder(contact_id: str, remind_at: str, message: str):
    try:
        response = supabase.table("reminders").insert({
            "contact_id": contact_id,
            "remind_at": remind_at,
            "message": message,
            "status": "pending"
        }).execute()
        return response.data[0]
    except Exception as e:
        raise Exception(f"Failed to create reminder: {e}")

def get_reminders_by_contact(contact_id: str):
    try:
        response = supabase.table("reminders") \
            .select("*") \
            .eq("contact_id", contact_id) \
            .order("remind_at") \
            .execute()
        return response.data
    except Exception as e:
        raise Exception(f"Failed to fetch reminders: {e}")

def mark_reminder_done(reminder_id: str):
    try:
        response = supabase.table("reminders") \
            .update({"status": "done"}) \
            .eq("id", reminder_id) \
            .execute()
        return response.data
    except Exception as e:
        raise Exception(f"Failed to mark reminder as done: {e}")

def delete_reminder(reminder_id: str):
    try:
        response = supabase.table("reminders") \
            .delete() \
            .eq("id", reminder_id) \
            .execute()
        return response.data
    except Exception as e:
        raise Exception(f"Failed to delete reminder: {e}")

def update_reminder(reminder_id: str, update_fields: dict):
    try:
        response = supabase.table("reminders") \
            .update(update_fields) \
            .eq("id", reminder_id) \
            .execute()
        return response.data[0]
    except Exception as e:
        raise Exception(f"Failed to update reminder: {e}")
