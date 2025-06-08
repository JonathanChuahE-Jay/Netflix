import React, { useEffect, useRef } from "react";
import "./Modal.css";

const Modal = ({ hoverEffect = false, setShowArrow, showModal, position, setShowModal, children, className, width, height, padding, borderRadius }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal, setShowModal]);

    if (!showModal) return null;

    return (
        <div className="modal-overlay" >
            <div
                ref={modalRef}
                className={`modal zoom-out ${showModal ? "show" : ""} ${className || ""}`}
                style={{
                    top: position?.top || "50%",
                    left: position?.left || "50%",
                    width, height, padding, borderRadius
                }}
                onMouseEnter={() => {
                    if (hoverEffect) {
                        setShowModal(true);
                        setShowArrow(true);
                    }
                }}
                onMouseLeave={() => {
                    if (hoverEffect) {
                        setShowModal(false);
                        setShowArrow(false);
                    }
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
