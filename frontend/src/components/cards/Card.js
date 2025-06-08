import { useState } from "react";

const Card = ({ children, width, height, hoverEffect = true, cursor, isSelected, onClick }) => {
    return (
        <div 
            className={`card ${hoverEffect ? "hover" : ""} ${isSelected ? "selected" : ""}`} 
            style={{ color: "white", width, height, cursor }} 
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
