import { createContext, useContext, useState } from "react";
import Toast from "../components/toast/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = ({ type = "info", message, position = "bottom-center", duration = 3000 }) => {
        setToast({ type, message, position });

        setTimeout(() => setToast(null), duration + 300); 
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
