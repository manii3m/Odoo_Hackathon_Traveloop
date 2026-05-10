import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const COLORS = {
  success: '#10B981',
  error: '#EF4444',
  info: '#3B82F6',
  warning: '#F59E0B',
};

export default function ToastContainer() {
  const { toasts, showToast } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => {
        const Icon = ICONS[toast.type] || Info;
        const color = COLORS[toast.type] || COLORS.info;
        return (
          <div
            key={toast.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl min-w-[300px]"
            style={{
              background: '#1C2537',
              border: `1px solid ${color}33`,
              animation: 'slideInRight 0.3s ease-out',
            }}
          >
            <Icon size={18} style={{ color, flexShrink: 0 }} />
            <span className="text-sm flex-1" style={{ color: '#F8FAFC' }}>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}

export function Modal({ children, onClose, title, maxWidth = '672px' }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl w-full max-h-[80vh] overflow-y-auto"
        style={{
          maxWidth,
          background: '#111827',
          border: '1px solid #1E2D45',
          animation: 'scaleIn 0.2s ease-out',
        }}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #1E2D45' }}>
            <h3 className="text-lg font-semibold" style={{ color: '#F8FAFC' }}>{title}</h3>
            <button onClick={onClose} className="cursor-pointer p-1 rounded-lg transition-colors" style={{ color: '#94A3B8' }} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
