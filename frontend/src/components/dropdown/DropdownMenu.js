import React, { useState, useRef, cloneElement} from "react";
import "./Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropdownMenu = ({
    trigger,
    children,
    title,
    icon,
    bg,
    iconSize,
    color,
    padding,
    margin,
    iconPosition = "right",
    position = "center",
    setDivider = true
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };

    const childrenWithDividers = React.Children.toArray(children).map((child, index) =>
        index !== children.length - 1
            ? cloneElement(child, { setDivider })
            : child
    );

    return (
        <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="dropdown-btn" style={{ backgroundColor: bg, color: color, padding: padding, margin: margin }}>
                {trigger ? (
                    trigger
                ) : (
                    <>
                        {iconPosition === "left" && <FontAwesomeIcon color="white" icon={icon} size={iconSize} />}
                        {title && <p style={{ marginLeft: iconPosition === "left" ? "8px" : "0px", marginRight: iconPosition === "right" ? "8px" : "0px" }}>{title}</p>}
                        {iconPosition === "right" && <FontAwesomeIcon color="white" icon={icon} size={iconSize} />}
                    </>
                )}
            </button>

            <div className={`dropdown-menu ${position} ${isOpen ? "show" : ""}`}>
                <div className={`dropdown-arrow ${position}`}></div>
                {childrenWithDividers}
            </div>
        </div>
    );
};

export default DropdownMenu;
