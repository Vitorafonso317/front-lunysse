import { X } from 'lucide-react';
import { Button } from './Button';

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Sim", cancelText = "Não" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glassmorphism max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-dark">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-dark transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700">{message}</p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};