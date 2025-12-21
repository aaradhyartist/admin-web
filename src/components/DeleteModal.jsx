import React from 'react';
import { Trash2, X } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      {/* Modal */}
      <div className="bg-white w-full max-w-md border border-slate-300 rounded-lg">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">
            Confirm Delete
          </h3>

          <button
            onClick={onClose}
            disabled={loading}
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <div className="flex items-start gap-3">
            <Trash2 size={22} className="text-red-500 mt-1" />
            <p className="text-base text-slate-700 leading-relaxed">
              Are you sure you want to delete this entry?
              <br />
              <span className="text-red-600 font-medium">
                This action cannot be undone.
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-slate-200">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-base border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 disabled:opacity-50 hover:cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-base text-white rounded-md bg-red-600 hover:bg-red-700 disabled:opacity-50 flex items-center justify-center hover:cursor-pointer"
          >
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
