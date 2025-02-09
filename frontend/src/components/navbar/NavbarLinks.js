import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const NavbarLinks = ({ links }) => {
    const location = useLocation(); 

    return (
        <>
            {links.map((link, index) => {
                const isActive = location.pathname === link.to;
                
                return (
                    <Link 
                        to={link.to} 
                        key={index} 
                        className={`navbar-link ${isActive ? "active" : ""}`}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </>
    );
};

export default NavbarLinks;
