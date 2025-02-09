import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropdownItem = ({ children, onClick, icon, iconSize = "sm", iconColor, setDivider, avatar }) => {
    return (
        <div className={`dropdown-item ${setDivider ? "divider" : ""}`} onClick={onClick}>
            {avatar ? (
                <img src={avatar} alt="Dropdown Icon" className="dropdown-img" style={{ width: "24px", marginRight: "10px" }} />
            ) : icon ? (
                <FontAwesomeIcon icon={icon} size={iconSize} color={iconColor} style={{ marginRight: "10px" }} />
            ) : null}
            {children}
        </div>
    );
};

export default DropdownItem;
