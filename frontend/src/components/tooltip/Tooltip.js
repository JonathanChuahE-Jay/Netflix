import React, { useState } from "react";
import "./Tooltip.css";

const Tooltip = ({ children, text, position = "top", bg = "black" }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    return (
        <div className="tooltip-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
            {isVisible && (
                <div className={`tooltip ${position}`}>
                    <div className="tooltip-arrow"></div>
                    <span>{text}</span>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
