import React, { useEffect } from 'react';

type Action = {
  type: string;
  [key: string]: any;
};

type ConfirmationDialogProps = {
  actions: Action[];
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ actions, onConfirm, onCancel }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200" aria-hidden="true" />
      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 border border-crm-accent/40 dark:border-crm-accent/60 rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-lg mx-4 animate-fadeIn overflow-y-auto max-h-[90vh]">
        <h3 className="text-2xl font-extrabold mb-6 text-crm-accent tracking-tight flex items-center gap-2">
          <svg className="w-7 h-7 text-crm-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20.5C6.201 20.5 1 15.299 1 9.5S6.201-1.5 12-1.5 23 4.701 23 10.5 17.799 20.5 12 20.5z" /></svg>
          Confirm Actions
        </h3>
        <ul className="mb-8 space-y-4">
          {actions.map((action, idx) => (
            <li key={idx} className="bg-crm-bg3/40 dark:bg-slate-800 rounded-xl px-5 py-3 text-gray-900 dark:text-gray-100 shadow-sm border border-crm-accent/10">
              <span className="font-bold capitalize text-crm-accent text-lg block mb-2">{action.type.replace(/_/g, ' ')}</span>
              <ul className="space-y-1">
                {Object.entries(action).filter(([k]) => k !== 'type').map(([k, v]) => (
                  <li key={k} className="pl-2 text-gray-800 dark:text-gray-200 flex gap-2">
                    <span className="font-semibold text-crm-accent/80 dark:text-crm-accent">{k}:</span>
                    <span className="font-mono break-all">{String(v)}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-crm-accent/40 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-xl bg-black text-white font-bold shadow hover:from-crm-bg3 hover:to-crm-accent focus:outline-none focus:ring-2 focus:ring-crm-accent transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog; 