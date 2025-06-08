import { useEffect, useState } from "react";
import "./Avatar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Avatar = ({ src, size = "md", shape = "circle", onImageChange, editAvatar = false }) => {

    const sizeMap = {
        sm: 40,
        md: 50,
        l: 60,
        xl: 70,
        xxl: 100
    };

    const paddingSize = {
        sm: 2,
        md: 3,
        l: 4,
        xl: 5,
        xxl: 10
    };

    const avatarSize = sizeMap[size] || sizeMap.md;
    const shapeClass = shape === "square" ? "square" : "circle";
    const [image, setImage] = useState(src);

    useEffect(()=>{
        setImage(src)
    },[src])
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            if (onImageChange) {
                onImageChange(file);
            }
        }
    };

    return (
        <div className="avatar-container" style={{ width: avatarSize, height: avatarSize }}>
            <img
                src={image}
                alt="User Avatar"
                className={`avatar ${shapeClass}`}
                style={{ width: avatarSize, height: avatarSize }}
            />
            {
                editAvatar && (
                    <label
                        className="upload-button"
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: paddingSize[size] }}
                    >
                        <FontAwesomeIcon size={size} icon={faEdit} />
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                    </label>
                )
            }
        </div>
    );
}

export default Avatar;