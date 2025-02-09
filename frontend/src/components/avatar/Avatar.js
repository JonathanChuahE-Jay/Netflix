import "./Avatar.css";

const Avatar = ({ src, size = "md", shape = "circle" }) => {
    const sizeMap = {
        sm: 40,
        md: 50,
        l: 60,
        xl: 70
    };

    const avatarSize = sizeMap[size] || sizeMap.md;
    const shapeClass = shape === "square" ? "square" : "circle";

    return (
        <img
            src={src}
            alt="User Avatar"
            className={`avatar ${shapeClass}`}
            style={{ width: avatarSize, height: avatarSize }}
        />
    );
}

export default Avatar;
