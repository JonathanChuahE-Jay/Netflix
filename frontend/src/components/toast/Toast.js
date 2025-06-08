import React, { useEffect, useState } from "react";
import "./Toast.css";

const Toast = ({ message, type = "info", position = "bottom-center", onClose, duration = 3000 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);

        const slideOutTimer = setTimeout(() => {
            setVisible(false);
        }, duration);

        const removeToastTimer = setTimeout(() => {
            onClose();
        }, duration + 300);

        return () => {
            clearTimeout(slideOutTimer);
            clearTimeout(removeToastTimer);
        };
    }, [onClose, duration]);

    return (
        <div className={`toast toast-${type} toast-${position} ${visible ? "slide-in" : "slide-out"}`}>
            <span>{message}</span>
            <button onClick={() => setVisible(false)} className="toast-close">&times;</button>
        </div>
    );
};

export default Toast;
