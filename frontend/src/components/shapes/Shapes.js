import "./Shapes.css";

const Shapes = ({ shape = "rectangle", className, children, hasHole = false, width, height, padding, color, bg, border , borderRadius}) => {
    return (
        <div className={`shapes-wrapper ${className}`} >
            <div
                className={`shapes ${shape} ${hasHole ? "hole" : ""}`}
                style={{
                    borderRadius,
                    width: shape === "rectangle" ? width || "300px" : width,
                    height: shape === "rectangle" ? height || "150px" : height,
                    padding,
                    color,
                    backgroundColor: bg,
                    border
                }}
            >
                <div className="shapes-content">{children}</div>
            </div>
        </div>
    );
};

export default Shapes;
