import React from "react";
import DropdownMenu from "../dropdown/DropdownMenu";
import DropdownItem from "../dropdown/DropdownItem";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const NavbarDropdownMenuLinks = ({ links }) => {
    return (
        <>
            <DropdownMenu title="Browse" icon={faChevronDown} padding="0px" margin="0px 0px 0px 20px">
                {links.map((link, index) => (
                    <DropdownItem key={index} onClick={link.onClick}>
                        {link.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </>
    );
};

export default NavbarDropdownMenuLinks;
