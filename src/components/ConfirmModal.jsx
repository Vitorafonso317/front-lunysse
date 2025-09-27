import { X } from 'lucide-react';
import { Button } from './Button';

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Sim", cancelText = "Não" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600">{message}</p>
        </div>
        
        <div className="flex gap-3 p-4 border-t">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};