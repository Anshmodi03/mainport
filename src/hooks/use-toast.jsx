import { useState, useCallback } from 'react';

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = ++toastId;
    const newToast = { id, ...toast };
    
    setToasts((prev) => [...prev, newToast]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((options) => {
    if (typeof options === 'string') {
      return addToast({ title: options });
    }
    return addToast(options);
  }, [addToast]);

  return { toast, toasts, removeToast };
}

// Toast component that can be used in the app
export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast"
          onClick={() => removeToast(toast.id)}
        >
          {toast.title && <div className="toast-title">{toast.title}</div>}
          {toast.description && <div className="toast-description">{toast.description}</div>}
        </div>
      ))}
    </div>
  );
}