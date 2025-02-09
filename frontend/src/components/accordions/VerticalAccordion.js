import { useState } from "react";
import "./Accordion.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

const VerticalAccordion = ({ game }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="vertical-accordion"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="image-container">
                <img className="vertical-accordion-img" src={game?.picture} alt={game?.name} />
                <div className={`image-overlay ${isOpen ? "show" : ""}`}>
                    <div className="game-icon-container">
                        <FontAwesomeIcon icon={faGamepad} />
                    </div>
                    <p>{game?.name}</p>
                </div>
            </div>
        </div>
    );
};

export default VerticalAccordion;
