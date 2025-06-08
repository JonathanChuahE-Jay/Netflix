const Text = ({
    children,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    margin,
    position,
    top,
    bottom,
    left,
    right,
    size = "md",
    textAlign,
    fontSize,
    padding,
    color = "black",
    fontWeight
}) => {
    const sizes = {
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        xxl: "32px",
        xxxl: "44px"
    };

    return (
        <p
            style={{
                textAlign,
                margin,
                marginTop,
                marginBottom,
                marginLeft,
                marginRight,
                position,
                top,
                bottom,
                left,
                right,
                padding,
                color,
                fontSize: sizes[size] || fontSize,
                fontWeight,
            }}
        >
            {children}
        </p>
    );
};

export default Text;
