import React, { useState, useEffect } from "react";
import "./Spinner.css";
import Text from "../text/Text";

const Spinner = ({
    loadingText = true,
    labelPosition = "bottom",
    loadingDots = true,
    label = "",
    size = "sm",
    color = "white",
    borderWidth = "4px",
    variant = "default" // 'default', 'dots', 'bars', 'pulse', 'square'
}) => {
    const sizes = {
        sm: "20px",
        md: "40px",
        lg: "60px",
        xl: "80px",
    };

    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const renderSpinner = () => {
        switch (variant) {
            case "dots":
                return (
                    <div className="dots-spinner">
                        <div className="dot" style={{ backgroundColor: color }}></div>
                        <div className="dot" style={{ backgroundColor: color }}></div>
                        <div className="dot" style={{ backgroundColor: color }}></div>
                    </div>
                );
            case "bars":
                return (
                    <div className="bars-spinner">
                        <div className="bar" style={{ backgroundColor: color }}></div>
                        <div className="bar" style={{ backgroundColor: color }}></div>
                        <div className="bar" style={{ backgroundColor: color }}></div>
                    </div>
                );
            case "pulse":
                return <div className="pulse-spinner" style={{ backgroundColor: color }}></div>;
            case "square":
                return (
                    <div
                        className="square-spinner"
                        style={{
                            width: sizes[size],
                            height: sizes[size],
                            backgroundColor: color,
                        }}
                    >
                        <div className="inner-square"></div>
                    </div>
                )
            default:
                return (
                    <div
                        className="spinner-animation"
                        style={{
                            width: sizes[size],
                            height: sizes[size],
                            border: `${borderWidth} solid ${color}`,
                            borderTopColor: "transparent",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                        }}
                    ></div>
                );
        }
    };

    return (
        <div className="spinner" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {labelPosition === "top" && loadingText && (
                <Text color="white">{label ? `${label}${loadingDots ? dots : ''}` : `Loading${loadingDots ? dots : ''}`}</Text>

            )}

            {renderSpinner()}

            {labelPosition === "bottom" && loadingText && (
                <Text color="white">{label ? `${label}${loadingDots ? dots : ''}` : `Loading${loadingDots ? dots : ''}`}</Text>
            )}
        </div>
    );
};

export default Spinner;
