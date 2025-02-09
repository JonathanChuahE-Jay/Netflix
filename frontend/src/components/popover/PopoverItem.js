const PopoverItem = ({ children, color }) => {
    return <div className="popover-item" style={{ color: color }}>{children}</div>;
};

export default PopoverItem;
