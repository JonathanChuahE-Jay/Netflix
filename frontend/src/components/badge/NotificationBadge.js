import React from "react";
import "./Badge.css";

const NotificationBadge = ({ count }) => {
    return (
        count > 0 && (
            <div className="notification-badge">
                {count}
            </div>
        )
    );
};

export default NotificationBadge;
