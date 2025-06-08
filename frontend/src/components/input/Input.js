import { useEffect, useState } from "react";
import { faClose, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Input.css";

const Input = ({
    type = "text",
    placeholder = "",
    value = "",
    onChange,
    icon,
    iconPosition = "left",
    errorMessage = "",
    bg = "white",
    color = "black",
    border = "1px solid gray",
    borderRadius = "5px",
    padding = "15px 10px",
    marginTop,
    marginBottom,
    margin,
    min,
    max,
    width = "100%",
    height,
    fontSize = "15px",
    deleteBtn = true,
    register,
    name,
    required,
    validationRules,
    setValue,
    disabled,
    minLength,
    maxLength,
    textAlign,
    onKeyDown,
    iconSize,
    passwordView = false,
    animation = true,
    autoFocus = false
}) => {
    const [viewPassword, setViewPassword] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        if (!inputValue) {
            setIsFocused(false);
        }
    }, [inputValue]);

    const handleChange = (e) => {
        setValue(name, e.target.value);
        setInputValue(e.target.value);
        if (onChange) onChange(e);
    };

    const handleClear = () => {
        setInputValue("");
        setValue(name, "");
        if (onChange) onChange({ target: { value: "" } });
    };

    return (
        <div className="input-wrapper" style={{ width, height }}>
            <div style={{
                cursor: disabled ? "not-allowed" : "text",
                transition: "all 0.2s ease-in-out",
                display: "flex",
                alignItems: "center",
                border,
                height,
                marginTop,
                marginBottom,
                margin,
                borderRadius,
                backgroundColor: bg,
                padding,
                flex: 1,
                position: "relative",
                width,
            }}>
                {icon && iconPosition === "left" && (
                    <FontAwesomeIcon size={iconSize} icon={icon} style={{ marginRight: "8px", color: "gray" }} />
                )}
                {
                    animation && (
                        <p
                            className={`input-label ${isFocused || inputValue ? "active" : ""}`}
                            style={{
                                left: icon && iconPosition === "left" ? "35px" : "10px",
                            }}
                        >
                            {placeholder}
                        </p>
                    )
                }
                <input
                    onKeyDown={onKeyDown}
                    autoFocus={autoFocus}
                    min={min}
                    minLength={minLength}
                    maxLength={maxLength}
                    max={max}
                    type={passwordView ? (viewPassword ? "text" : "password") : type}
                    {...register(name, validationRules)}
                    value={inputValue}
                    disabled={disabled}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(!!inputValue)}
                    style={{
                        cursor: disabled ? "not-allowed" : "",
                        color,
                        width,
                        height,
                        fontSize,
                        textAlign
                    }}
                    required={required}
                    className={`input ${animation ? isFocused || inputValue ? "active" : "" : ""}`}
                />


                {icon && iconPosition === "right" && (
                    <FontAwesomeIcon size={iconSize} icon={icon} style={{ marginLeft: "8px", color: "gray" }} />
                )}

                {deleteBtn && inputValue && (
                    <>
                        {passwordView && (
                            <FontAwesomeIcon
                                size={iconSize}
                                icon={viewPassword ? faEye : faEyeSlash}
                                onClick={() => setViewPassword(!viewPassword)}
                                style={{ marginRight: "10px", color: "gray", cursor: "pointer" }}
                            />
                        )}
                        <FontAwesomeIcon
                            size={iconSize}
                            icon={faClose}
                            onClick={handleClear}
                            style={{ marginLeft: "8px", color: "gray", cursor: "pointer" }}
                        />
                    </>
                )}
            </div>

            {errorMessage && (
                <span className="input-error-msg">
                    {errorMessage}
                </span>
            )}
        </div>
    );
};

export default Input;