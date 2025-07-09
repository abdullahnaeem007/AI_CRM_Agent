import React, { useState, useEffect } from 'react';
import ContactList, { Contact } from '../components/ContactList';
import InstructionInput from '../components/InstructionInput';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { parseInstruction, executeActions, getContacts } from '../lib/api';
import Image from 'next/image';

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-xl shadow-lg text-base font-semibold flex items-center gap-2 transition-all animate-fadeIn ${type === 'success' ? 'bg-crm-accent text-white' : 'bg-red-500 text-white'}`}>
      {type === 'success' ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-white/80 hover:text-white font-bold">×</button>
    </div>
  );
}

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [actions, setActions] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [dark, setDark] = useState(false);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err: any) {
      setError('Failed to load contacts');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const handleInstruction = async (instruction: string) => {
    setLoading(true);
    setError(null);
    try {
      const parsed = await parseInstruction(instruction);
      setActions(parsed);
      setShowConfirm(true);
    } catch (err: any) {
      setError(err.message);
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await executeActions(actions);
      setShowConfirm(false);
      setActions(null);
      await fetchContacts(); // Refresh contacts after actions
      setToast({ message: 'Actions executed successfully!', type: 'success' });
    } catch (err: any) {
      setError(err.message);
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setActions(null);
  };

  return (
    <div className={`min-h-screen w-full bg-white dark:bg-gray-900 flex flex-col transition-colors duration-300`}>
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-crm-bg2/80 dark:bg-gray-800/80 backdrop-blur border-b border-crm-bg3 dark:border-gray-700 shadow-sm py-3 px-4 flex items-center gap-3 justify-between">
        <div className="flex items-center space-x-5">
          <Image src="/ai_agent.svg" alt="AI CRM Assistant Logo" width={40} height={40} className="drop-shadow" />
          <span className="text-2xl font-extrabold tracking-tight text-crm-accent dark:text-crm-bg3">Remindly AI</span>
        </div>
        <button
          className="rounded-full p-2 bg-crm-accent/80 hover:bg-crm-accent text-white shadow transition focus:outline-none focus:ring-2 focus:ring-crm-accent"
          onClick={() => setDark((d) => !d)}
          title="Toggle dark mode"
        >
          {dark ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95-7.07l-.71.71M7.05 4.93l-.71-.71" /></svg>
          )}
        </button>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-2 sm:px-6">
        <div className="w-full max-w-3xl bg-crm-bg2/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col gap-8 mt-8 mb-8 border border-crm-bg3 dark:border-gray-700">
          <ContactList contacts={contacts} />
          <InstructionInput onSubmit={handleInstruction} />
          {loading && (
            <div className="flex items-center gap-2 text-crm-accent font-medium animate-pulse">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              Loading...
            </div>
          )}
          {error && <div className="text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2">{error}</div>}
        </div>
      </main>
      {showConfirm && actions && (
        <ConfirmationDialog
          actions={actions}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      <footer className="w-full text-center text-crm-bg3 dark:text-gray-500 text-xs py-4">&copy; {new Date().getFullYear()} AI CRM Assistant. All rights reserved.</footer>
    </div>
  );
}
