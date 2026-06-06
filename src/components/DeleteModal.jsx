import React from 'react';
import { Trash2, X, AlertTriangle, Loader2 } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, loading, title, message }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={loading ? undefined : onClose}
    >
      {/* Modal */}
      <div
        className="w-full max-w-md bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-black text-white">{title || 'Confirm Delete'}</h3>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center shrink-0">
              <AlertTriangle size={22} />
            </div>
            <div className="pt-0.5">
              <p className="text-[15px] text-slate-200 leading-relaxed">
                {message || 'Are you sure you want to delete this entry?'}
              </p>
              <p className="text-sm text-[#DC2626] font-bold mt-1">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-bold border border-white/10 text-slate-200 rounded-xl hover:bg-white/5 disabled:opacity-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl bg-[#DC2626] hover:bg-[#b91c1c] disabled:opacity-50 transition-colors cursor-pointer"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
