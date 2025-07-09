from app.core.config import supabase

def create_contact(user_id: str, name: str, email: str, phone: str, company: str):
    try:
        response = supabase.table("contacts").insert({
            "user_id": user_id,
            "name": name,
            "email": email,
            "phone": phone,
            "company": company
        }).execute()
        return response.data[0]
    except Exception as e:
        raise Exception(f"Failed to create contact: {e}")

def get_contacts_by_user(user_id: str):
    try:
        response = supabase.table("contacts") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("created_at", desc=True) \
            .execute()
        return response.data
    except Exception as e:
        raise Exception(f"Failed to get contacts: {e}")

def get_contact_by_id(contact_id: str):
    try:
        response = supabase.table("contacts") \
            .select("*") \
            .eq("id", contact_id) \
            .single() \
            .execute()
        return response.data
    except Exception as e:
        raise Exception(f"Failed to get contact: {e}")

def update_contact(contact_id: str, update_fields: dict):
    try:
        response = supabase.table("contacts") \
            .update(update_fields) \
            .eq("id", contact_id) \
            .execute()
        return response.data[0]
    except Exception as e:
        raise Exception(f"Failed to update contact: {e}")

def delete_contact(contact_id: str):
    try:
        response = supabase.table("contacts") \
            .delete() \
            .eq("id", contact_id) \
            .execute()
        return response.data
    except Exception as e:
        raise Exception(f"Failed to delete contact: {e}")

