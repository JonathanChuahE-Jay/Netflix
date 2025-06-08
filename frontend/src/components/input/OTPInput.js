import React, { useState, useRef, useEffect } from "react";

const OTPInput = ({ setValue, onKeyDown }) => {
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const [otp, setOtp] = useState(["", "", "", ""]);

    useEffect(() => {
        setValue("otp", otp.join(""));
    }, [otp, setValue]);

    const handleChange = (index, e) => {
        const value = e.target.value.replace(/\D/, "");

        const newOtp = [...otp];
        newOtp[index] = value ? value.charAt(0) : "";
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (onKeyDown) {
            onKeyDown(e)
        }
        if (e.key === "Backspace") {
            const newOtp = [...otp];

            if (newOtp[index]) {
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputRefs[index - 1].current.focus();
            }
        }
    };

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {otp.map((digit, index) => (
                <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    style={{
                        width: "40px",
                        height: "40px",
                        fontSize: "20px",
                        textAlign: "center",
                        borderRadius: "15%",
                    }}
                />
            ))}
        </div>
    );
};

export default OTPInput;
