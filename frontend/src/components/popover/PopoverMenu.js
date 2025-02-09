import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationBadge from "../badge/NotificationBadge";
import "./Popover.css";

const PopoverMenu = ({ children, icon, size, color, notificationCount, fontSize }) => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="popover-container"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setTimeout(() => setIsOpen(false), 200)}
        >
            <button
                className="popover-button"
            >
                <FontAwesomeIcon icon={icon} size={size} color={color} />
                <NotificationBadge count={notificationCount} />
            </button>

            {isOpen && (
                <div className="popover-content" style={{ fontSize: fontSize }}>
                    <div className="popover-arrow"></div>
                    {children}
                </div>
            )}
        </div>
    );
};

export default PopoverMenu;
