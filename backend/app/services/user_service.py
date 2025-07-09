from app.core.config import supabase

def create_user(email: str, name: str):
    response = supabase.table("User").insert({
        "email": email,
        "name": name
    }).execute()

    breakpoint()

    if response.error:
        raise Exception(f"Failed to create user: {response.error.message}")
    
    return response.data[0]

def get_users():
    return supabase.table("User").select("*").order("created_at", desc=True).execute().data

def get_user_by_id(user_id: str):
    return supabase.table("User").select("*").eq("id", user_id).single().execute().data
