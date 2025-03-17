import React, { createContext, useContext, useState } from 'react';
import './ToastContext.css';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toast }}>
      {children}
      {toast.visible && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-content">
            <p>{toast.message}</p>
            <button onClick={hideToast} className="toast-close">×</button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};