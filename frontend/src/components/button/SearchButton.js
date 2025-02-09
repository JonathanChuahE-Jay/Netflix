import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./Button.css";

const SearchButton = ({ icon, size, color }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchText, setSearchText] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClear = () => {
        setSearchText("");
    };

    return (
        <div className="search-bar-container" ref={inputRef}>
            <button
                className={`search-bar-icon-button ${isExpanded ? "inside-left" : ""}`}
                onClick={() => setIsExpanded(true)}
            >
                <FontAwesomeIcon color={color} icon={icon} size={size} />
            </button>
            
            <input
                className={`search-bar-input ${isExpanded ? "expanded" : ""}`}
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            
            {searchText && (
                <button
                    className={`search-bar-clear-button ${isExpanded ? "inside-right" : ""}`}
                    onClick={handleClear}
                >
                    <FontAwesomeIcon color={color} icon={faClose} size={size} />
                </button>
            )}
        </div>
    );
};

export default SearchButton;
