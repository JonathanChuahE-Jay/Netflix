import React from "react";
import "./Checkbox.css";

const Checkbox = ({
    label,
    checked,
    defaultChecked,
    onChange,
    className,
    border = "2px solid #007bff",
    tickColor = "white",
    bg = "transparent",
    width = "20px",
    height = "20px",
    fontSize = "16px",
    variant = "tick", //tick, cross, dot, dash
    color
}) => {
    const handleChange = (event) => {
        onChange?.(event.target.checked);
    };

    return (
        <label className={`checkbox-container ${className}`} style={{ fontSize, display: "flex", alignItems: "center", color }}>
            <style>
                {`
                    .checkbox-input:checked + .checkbox-custom::after {
                        content: "${variant === "cross" ? "✖" : variant === "dot" ? "•" : variant === "dash" ? "-" : ""}";
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%) ${variant === "tick" ? "rotate(45deg)" : ""};
                        font-size: ${parseInt(width) / 1.5}px;
                        font-weight: bold;
                        color: ${tickColor};
                    }
                    
                    ${variant === "tick" ? `
                        .checkbox-input:checked + .checkbox-custom::after {
                            content: "";
                            width: 3px;
                            height: 7px;
                            border: solid ${tickColor};
                            border-width: 0 2px 2px 0;
                        }
                    ` : ""}
                `}
            </style>
            <input
                type="checkbox"
                className="checkbox-input"
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={handleChange}
            />
            <span
                className="checkbox-custom"
                style={{
                    border,
                    backgroundColor: bg,
                    width,
                    height,
                }}
            ></span>
            {label && <span className="checkbox-label">{label}</span>}
        </label>
    );
};

export default Checkbox;
