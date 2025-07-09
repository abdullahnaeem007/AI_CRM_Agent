import React, { useState } from 'react';

type InstructionInputProps = {
  onSubmit: (instruction: string) => void;
};

const InstructionInput: React.FC<InstructionInputProps> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur bg-white/70 border border-indigo-100 rounded-2xl shadow-lg p-6 flex flex-col gap-3 relative"
    >
      <label htmlFor="instruction" className="text-base font-semibold text-gray-700 mb-1">
        Ask your AI assistant
      </label>
      <textarea
        id="instruction"
        className="border-2 border-gray-200 rounded-xl p-3 min-h-[60px] focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition shadow-sm bg-white/80 placeholder-gray-400 text-gray-900 resize-none"
        placeholder="E.g. 'Add a note for Sarah Khan that says she’s interested in the Pro Plan. Follow up next Monday.'"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
      />
      <button
        type="submit"
        className="self-end bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!value.trim()}
      >
        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
        Parse Instruction
      </button>
    </form>
  );
};

export default InstructionInput; 