import React from "react";
import "./Badge.css";

const NotificationBadge = ({ size, count }) => {
    const sizes = {
        "sm" : "1px 4px",
        "md": "2px 5px",
        "lg": "2px 6px",
        "xl": "3px 7px"
    }
    return (
        count > 0 && (
            <div style={{padding: sizes[size]}} className="notification-badge">
                {count}
            </div>
        )
    );
};

export default NotificationBadge;
