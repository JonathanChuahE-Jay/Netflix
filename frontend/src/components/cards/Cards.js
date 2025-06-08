const Cards = ({ children, width = "100%", height = "auto", gap = "20px" }) => {
    return (
        <div className="cards" style={{ display: "flex", flexWrap: "wrap", gap, justifyContent: "center", width }}>
            {children}
        </div>
    );
};

export default Cards;
