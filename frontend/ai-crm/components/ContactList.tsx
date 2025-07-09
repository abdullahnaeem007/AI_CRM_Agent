import React, { useState } from 'react';
import { getNotes, getReminders } from '../lib/api';

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

type Note = {
  id: string;
  content: string;
  created_at: string;
};

type Reminder = {
  id: string;
  remind_at: string;
  message: string;
  status: string;
};

type ContactListProps = {
  contacts: Contact[];
};

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 80%)`;
  return color;
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExpand = async (contactId: string) => {
    if (expanded === contactId) {
      setExpanded(null);
      return;
    }
    setExpanded(contactId);
    setLoading(true);
    setError(null);
    try {
      const [notesData, remindersData] = await Promise.all([
        getNotes(contactId),
        getReminders(contactId),
      ]);
      setNotes(notesData);
      setReminders(remindersData);
    } catch (err: any) {
      setError('Failed to load notes or reminders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 rounded-xl shadow-lg p-0 overflow-hidden">
      <h2 className="text-xl font-bold px-6 pt-6 pb-2">Contacts</h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-max divide-y divide-gray-200 w-full">
          <thead className="bg-crm-bg3/40">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {contacts.map((contact) => (
              <React.Fragment key={contact.id}>
                <tr className="hover:bg-crm-bg3/20 transition">
                  <td className="px-2 py-3 text-center">
                    <button
                      className={`rounded-full p-1 transition focus:outline-none focus:ring-2 focus:ring-crm-accent ${expanded === contact.id ? 'bg-crm-accent/20' : 'bg-crm-bg3/40 hover:bg-crm-accent/10'}`}
                      onClick={() => handleExpand(contact.id)}
                      aria-label={expanded === contact.id ? 'Collapse' : 'Expand'}
                    >
                      {expanded === contact.id ? (
                        <svg className="w-5 h-5 text-crm-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                      ) : (
                        <svg className="w-5 h-5 text-crm-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-3 flex items-center gap-3">
                    <span
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full text-base font-bold shadow"
                      style={{ background: stringToColor(contact.name), color: '#3b3663' }}
                    >
                      {contact.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                    <span className="font-medium text-gray-900">{contact.name}</span>
                  </td>
                  <td className="px-6 py-3 text-gray-700">{contact.email}</td>
                  <td className="px-6 py-3 text-gray-700">{contact.phone}</td>
                  <td className="px-6 py-3 text-gray-700">{contact.company}</td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-crm-accent hover:text-crm-bg3 transition px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-crm-accent" title="Edit" disabled>
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6" /></svg>
                    </button>
                    <button className="text-red-400 hover:text-red-600 transition px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-200" title="Delete" disabled>
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </td>
                </tr>
                {expanded === contact.id && (
                  <tr>
                    <td colSpan={6} className="bg-crm-bg1/80 dark:bg-gray-900/80 px-8 pb-6 pt-2 transition-all" style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                      {loading ? (
                        <div className="flex items-center gap-2 text-crm-accent font-medium animate-pulse py-4">
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                          Loading notes & reminders...
                        </div>
                      ) : error ? (
                        <div className="text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2">{error}</div>
                      ) : (
                        <div className="flex flex-col md:flex-row gap-8">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-crm-accent mb-2">Notes</h4>
                            {notes.length === 0 ? (
                              <div className="text-gray-400 italic">No notes yet.</div>
                            ) : (
                              <ul className="space-y-2">
                                {notes.map((note) => (
                                  <li key={note.id} className="bg-crm-bg2/80 rounded-lg px-4 py-2 shadow-sm text-gray-800">
                                    <span className="block text-sm">{note.content}</span>
                                    <span className="block text-xs text-gray-400 mt-1">{new Date(note.created_at).toLocaleString()}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-crm-accent mb-2">Reminders</h4>
                            {reminders.length === 0 ? (
                              <div className="text-gray-400 italic">No reminders yet.</div>
                            ) : (
                              <ul className="space-y-2">
                                {reminders.map((rem) => (
                                  <li key={rem.id} className={`rounded-lg px-4 py-2 shadow-sm text-gray-800 ${rem.status === 'done' ? 'bg-crm-bg3/60 line-through text-gray-400' : 'bg-crm-bg2/80'}`}>
                                    <span className="block text-sm">{rem.message}</span>
                                    <span className="block text-xs text-gray-400 mt-1">{new Date(rem.remind_at).toLocaleString()}</span>
                                    <span className={`inline-block ml-2 px-2 py-0.5 rounded text-xs font-semibold ${rem.status === 'done' ? 'bg-gray-300 text-gray-500' : 'bg-crm-accent text-white'}`}>{rem.status}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList; 