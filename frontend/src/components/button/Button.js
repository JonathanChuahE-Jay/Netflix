import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
    type,
    disabled,
    iconPosition = "left",
    iconSize = "1x",
    iconColor = "inherit",
    alignItems = "center",
    justifyContent = "center",
    display,
    icon,
    children,
    bg = "red",
    padding = "",
    margin,
    color = "white",
    border = "1px solid black",
    borderRadius = "5px",
    fontSize = "16px",
    fontWeight = "bold",
    width,
    height,
    onClick,
    marginBottom,
    marginTop,
    iconToRight,
    gap = "8px"
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{
                marginTop,
                display,
                width,
                height,
                backgroundColor: bg,
                padding,
                margin,
                color,
                border,
                alignItems,
                justifyContent,
                borderRadius,
                fontSize,
                fontWeight,
                display: "flex",
                alignItems: "center",
                gap: gap,
                cursor: "pointer",
                marginBottom,
            }}
        >
            {icon && iconPosition === "left" && (
                <FontAwesomeIcon icon={icon} size={iconSize} color={iconColor} />
            )}
            {children}
            {icon && iconPosition === "right" && (
                <FontAwesomeIcon style={{ marginLeft: iconToRight ? "auto" : "" }} icon={icon} size={iconSize} color={iconColor} />
            )}
        </button>
    );
};

export default Button;
