import React from "react";
import "./Modal.css";

const Modal = ({ setShowArrow, showModal, position, setShowModal, children, className }) => {
    if (!showModal) return null;

    return (
        <div
            className={`modal zoom-out ${showModal ? "show" : ""} ${className || ""}`}
            style={{
                top: position?.top || "50%",
                left: position?.left || "50%",
            }}
            onMouseEnter={() => { setShowModal(true); setShowArrow(true); }}
            onMouseLeave={() => { setShowModal(false); setShowArrow(false) }}
        >
            {children}
        </div>
    );
};

export default Modal;
