import os
import json
import re
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extract_json_string(raw_string):
    # Remove triple backticks and optional "json" from GPT output
    return re.sub(r"^```(?:json)?|```$", "", raw_string.strip(), flags=re.MULTILINE).strip()

def parse_instruction(instruction: str):
    prompt = f"""
You are a CRM assistant. Convert the user's instruction into a JSON list of actions.

Output only valid JSON. Do not include comments or explanations.

Supported action types and their fields:
- add_contact: name, email, phone, company, user_id
- update_contact: contact_name, update_fields (dict of fields to update)
- delete_contact: contact_name
- add_note: contact_name, note
- delete_note: note_id
- add_reminder: contact_name, remind_at, message
- update_reminder: reminder_id, update_fields (dict of fields to update)
- mark_reminder_done: reminder_id
- delete_reminder: reminder_id

Examples:
Input: "Add a note to Sarah saying she's ready to buy"
Output:
{{
  "actions": [
    {{
      "type": "add_note",
      "contact_name": "Sarah",
      "note": "She's ready to buy"
    }}
  ]
}}

Input: "Create a new contact named John Doe, email john@email.com, phone 123456, company Acme"
Output:
{{
  "actions": [
    {{
      "type": "add_contact",
      "name": "John Doe",
      "email": "john@email.com",
      "phone": "123456",
      "company": "Acme",
      "user_id": 1
    }}
  ]
}}

Input: "Update Sarah's phone to 987654"
Output:
{{
  "actions": [
    {{
      "type": "update_contact",
      "contact_name": "Sarah",
      "update_fields": {{"phone": "987654"}}
    }}
  ]
}}

Input: "Delete the contact named Sarah"
Output:
{{
  "actions": [
    {{
      "type": "delete_contact",
      "contact_name": "Sarah"
    }}
  ]
}}

Input: "Delete note with id 123"
Output:
{{
  "actions": [
    {{
      "type": "delete_note",
      "note_id": "123"
    }}
  ]
}}

Input: "Remind me to call Sarah on 2025-06-17 at 9am"
Output:
{{
  "actions": [
    {{
      "type": "add_reminder",
      "contact_name": "Sarah",
      "remind_at": "2025-06-17T09:00:00",
      "message": "Call Sarah"
    }}
  ]
}}

Input: "Change the reminder 456 to 2025-06-18 at 10am"
Output:
{{
  "actions": [
    {{
      "type": "update_reminder",
      "reminder_id": "456",
      "update_fields": {{"remind_at": "2025-06-18T10:00:00"}}
    }}
  ]
}}

Input: "Mark reminder 456 as done"
Output:
{{
  "actions": [
    {{
      "type": "mark_reminder_done",
      "reminder_id": "456"
    }}
  ]
}}

Input: "Delete reminder 456"
Output:
{{
  "actions": [
    {{
      "type": "delete_reminder",
      "reminder_id": "456"
    }}
  ]
}}

Now parse: "{instruction}"
"""

    res = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )

    content = res.choices[0].message.content
    print("GPT Response:", content) 
    try:
        cleaned = extract_json_string(content)
        cleaned = re.sub(r'//.*', '', cleaned)  # Remove any // comments
        return json.loads(cleaned)["actions"]
    except Exception as e:
        raise Exception(f"Failed to parse GPT response: {e}")
