export async function parseInstruction(instruction: string) {
  try {
    const res = await fetch('http://localhost:8000/assistant/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ instruction }),
    });
    if (!res.ok) throw new Error('Failed to parse instruction');
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.actions;
  } catch (err: any) {
    throw new Error(err.message || 'Unknown error');
  }
}

export async function executeActions(actions: any[]) {
  const res = await fetch('http://localhost:8000/actions/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ actions }),
  });
  if (!res.ok) throw new Error('Failed to execute actions');
  return await res.json();
}

export async function getContacts() {
  const res = await fetch('http://localhost:8000/contacts/user/1');
  if (!res.ok) throw new Error('Failed to fetch contacts');
  return await res.json();
}

export async function getNotes(contactId: string) {
  const res = await fetch(`http://localhost:8000/notes/contact/${contactId}`);
  if (!res.ok) throw new Error('Failed to fetch notes');
  return await res.json();
}

export async function getReminders(contactId: string) {
  const res = await fetch(`http://localhost:8000/reminders/contact/${contactId}`);
  if (!res.ok) throw new Error('Failed to fetch reminders');
  return await res.json();
} 