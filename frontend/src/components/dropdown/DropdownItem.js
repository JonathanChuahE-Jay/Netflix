import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const DropdownItem = ({ children, onClick, icon, iconSize = "sm", iconColor, setDivider, avatar, link }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick(); 
        }
        if (link) {
            navigate(link);
        }
    };

    return (
        <div className={`dropdown-item ${setDivider ? "divider" : ""}`} onClick={handleClick} style={{ maxWidth: "140px", cursor: "pointer" }}>
            {avatar ? (
                <img src={avatar} alt="Dropdown Icon" className="dropdown-img"/>
            ) : icon ? (
                <FontAwesomeIcon icon={icon} size={iconSize} color={iconColor} style={{ marginRight: "10px" }} />
            ) : null}
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                {children}
            </span>
        </div>
    );
};

export default DropdownItem;
