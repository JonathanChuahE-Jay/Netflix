import React, { useState } from "react";
import "./Card.css";

const FlipCard = ({ children, flipMode = "click", width, height,fontSize }) => {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        if (flipMode === "click") {
            setFlipped(!flipped);
        }
    };

    const front = children.find(child => child.type === FrontCard);
    const back = children.find(child => child.type === BackCard);

    return (
        <div
            style={{width, height, fontSize,}}
            className={`flip-card ${flipMode === "hover" ? "hover-mode" : ""} ${flipped ? "flipped" : ""}`}
            onClick={handleFlip}
        >
            <div className="flip-card-inner">
                <div className="flip-card-front">{front}</div>
                <div className="flip-card-back">{back}</div>
            </div>
        </div>
    );
};

const FrontCard = ({ children }) => <>{children}</>;
const BackCard = ({ children }) => <>{children}</>;

export { FlipCard, FrontCard, BackCard };
