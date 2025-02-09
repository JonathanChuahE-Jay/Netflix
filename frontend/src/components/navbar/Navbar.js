import { useState, useEffect } from "react";
import bae from "../../assets/img/profile_picture/Pei yee.jpg";
import Avatar from "../avatar/Avatar";
import DropdownMenu from "../dropdown/DropdownMenu";
import { faBell, faEdit, faExchange, faQuestion, faSearch, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import DropdownItem from "../dropdown/DropdownItem";
import logo from "../../assets/img/logo/netflix.png";
import "./Navbar.css";
import useBreakpoint from "../breakpoint/UseBreakpoint";
import NavbarLinks from "./NavbarLinks";
import NavbarDropdownMenuLinks from "./NavbarDropdownMenuLinks";
import SearchButton from "../button/SearchButton";
import PopoverMenu from "../popover/PopoverMenu";
import PopoverItem from "../popover/PopoverItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Divider from "../divider/Divider";

const profiles = [
    { picture: bae, name: "Bae1" },
    { picture: bae, name: "Bae2" },
    { picture: bae, name: "Bae3" },
    { picture: bae, name: "Bae4" }
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [unseenNotifications, setUnseenNotifications] = useState(0);

    const breakpoint = useBreakpoint();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const Links = [
        { name: "Home", onClick: () => console.log("Home clicked"), to: "/" },
        { name: "TV Shows", onClick: () => console.log("TV Shows clicked"), to: "/movies" },
        { name: "Movies", onClick: () => console.log("Movies clicked"), to: "/new-popular" },
        { name: "New & Popular", onClick: () => console.log("New & Popular clicked") },
        { name: "My List", onClick: () => console.log("My List clicked"), to: "/my-list" },
        { name: "Browse by Languages", onClick: () => console.log("Browse by Languages clicked"), to: "/browse" },
    ];

    const Notification = [
        { id: 1, message: "New comment on your post.", isSeen: false, timestamp: "2025-02-05T10:00:00Z" },
        { id: 2, message: "Your profile has been updated.", isSeen: true, timestamp: "2025-02-04T15:30:00Z" },
        { id: 3, message: "New follower: John Doe.", isSeen: true, timestamp: "2025-02-05T09:20:00Z" },
        { id: 4, message: "Your subscription is about to expire.", isSeen: true, timestamp: "2025-02-03T12:00:00Z" },
        { id: 5, message: "System update completed successfully.", isSeen: false, timestamp: "2025-02-05T11:45:00Z" }
    ];

    useEffect(() => {
        const unseenCount = Notification.filter((notif) => !notif.isSeen).length;
        setUnseenNotifications(unseenCount);
    }, [Notification]);

    return (
        <nav className={`navbar ${isScrolled ? "scrolled" : "not-scrolled"}`}>
            <div className="link-container">
                <img src={logo} className="navbar-logo" />
                {breakpoint === "mobile" ? (
                    <NavbarDropdownMenuLinks links={Links} />
                ) : (
                    <NavbarLinks links={Links} />
                )}
            </div>

            <div className="navbar-right-container">
                <SearchButton icon={faSearch} size="xl" color="white" />
                <PopoverMenu fontSize="13px" icon={faBell} size="xl" color="white" notificationCount={unseenNotifications}>
                    {Notification.length > 0 &&
                        Notification.map((notification) => (
                            <PopoverItem color={notification?.isSeen? "gray" : "white" } key={notification.id}>{notification.message}</PopoverItem>
                        ))}
                </PopoverMenu>
                <DropdownMenu setDivider={false} trigger={<Avatar src={bae} size="sm" shape="square" />} position="right">
                    {profiles.map((profile, index) => (
                        <DropdownItem avatar={profile.picture} key={index}>
                            {profile.name}
                        </DropdownItem>
                    ))}

                    <Divider />
                    <DropdownItem icon={faEdit}>Manage Profile</DropdownItem>
                    <DropdownItem icon={faExchange}>Transfer Profile</DropdownItem>
                    <DropdownItem icon={faUser}>Account</DropdownItem>
                    <DropdownItem icon={faQuestion}>Help Center</DropdownItem>
                    <Divider />
                    <DropdownItem icon={faSignOut}>Logout</DropdownItem>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default Navbar;
