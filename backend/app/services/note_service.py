from app.core.config import supabase

def create_note(contact_id: str, content: str):
    try:
        response = supabase.table("notes").insert({
            "contact_id": contact_id,
            "content": content
        }).execute()
        return response.data[0]
    except Exception as e:
        raise Exception(f"Failed to create note: {e}")

def get_notes_by_contact(contact_id: str):
    try:
        response = supabase.table("notes") \
            .select("*") \
            .eq("contact_id", contact_id) \
            .order("created_at", desc=True) \
            .execute()
        return response.data
    except Exception as e:
        raise Exception(f"Failed to fetch notes: {e}")

def delete_note(note_id: str):
    try:
        response = supabase.table("notes") \
            .delete() \
            .eq("id", note_id) \
            .execute()
        return response.data
    except Exception as e:
        raise Exception(f"Failed to delete note: {e}")

def update_note(note_id: str, update_fields: dict):
    try:
        response = supabase.table("notes") \
            .update(update_fields) \
            .eq("id", note_id) \
            .execute()
        return response.data[0]
    except Exception as e:
        raise Exception(f"Failed to update note: {e}")
