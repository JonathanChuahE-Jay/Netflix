const Container = ({
    children,
    className = "",
    width = "50%",
    height = "50%",
    padding = "10px",
    backgroundColor,
    justifyContent,
    alignItems,
    display = "flex",
    flexDirection = "column",
    gap = "10px",
    color,
    glassmorphism = false,
    isCenter = false
}) => {
    const center = isCenter
        ? {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
        : {};

    const glassmorphismStyles = glassmorphism
        ? {
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)"
        }
        : {};

    return (
        <div
            className={`container ${className}`}
            style={{
                width,
                flexDirection,
                height,
                padding,
                backgroundColor,
                justifyContent,
                alignItems,
                display,
                gap,
                color,
                ...center,
                ...glassmorphismStyles
            }}
        >
            {children}
        </div>
    );
};

export default Container;
