import useNavbar from "../../hooks/useNavbar";
import Avatar from "../avatar/Avatar";
import defaultImgGreen from "../../assets/img/profile_picture/default-green.png";
import DropdownMenu from "../dropdown/DropdownMenu";
import { faBell, faEdit, faExchange, faQuestion, faSearch, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import DropdownItem from "../dropdown/DropdownItem";
import logo from "../../assets/img/logo/netflix.png";
import "./Navbar.css";
import NavbarLinks from "./NavbarLinks";
import NavbarDropdownMenuLinks from "./NavbarDropdownMenuLinks";
import SearchButton from "../button/SearchButton";
import PopoverMenu from "../popover/PopoverMenu";
import PopoverItem from "../popover/PopoverItem";
import Divider from "../divider/Divider";
import Button from "../button/Button";
import bae from "../../assets/img/profile_picture/Pei yee.jpg";
const BASE_URL = "http://localhost:5000";

const Navbar = () => {
    const { isScrolled, unseenNotifications, user, profiles, breakpoint, Notification, Links, handleLogout, navigate } = useNavbar();

    return (
        <nav className={`navbar ${isScrolled ? "scrolled" : "not-scrolled"}`}>
            <div className="link-container">
                <img src={logo} className="navbar-logo" alt="Netflix Logo" />
                {user && (breakpoint === "tablet" || breakpoint === "mobile" ? <NavbarDropdownMenuLinks links={Links} /> : <NavbarLinks links={Links} />)}
            </div>

            <div className="navbar-right-container">
                {user ? (
                    <>
                        <SearchButton icon={faSearch} size="xl" color="white" />
                        <PopoverMenu fontSize="13px" icon={faBell} size="xl" color="white" notificationCount={unseenNotifications}>
                            {Notification.map((notification) => (
                                <PopoverItem color={notification.isSeen ? "gray" : "white"} key={notification.id}>
                                    {notification.message}
                                </PopoverItem>
                            ))}
                        </PopoverMenu>
                        <DropdownMenu setDivider={false} trigger={<Avatar src={bae} size="sm" shape="square" />} position="right">
                            {profiles.map((profile, index) => (
                                <DropdownItem avatar={profile.profile_picture ? `${BASE_URL}${profile.profile_picture}` : defaultImgGreen} key={index}>
                                    {profile.username}
                                </DropdownItem>
                            ))}
                            <Divider />
                            <DropdownItem link={"/setup-profile"} icon={faEdit}>Manage Profile</DropdownItem>
                            <DropdownItem icon={faExchange}>Transfer Profile</DropdownItem>
                            <DropdownItem icon={faUser}>Account</DropdownItem>
                            <DropdownItem icon={faQuestion}>Help Center</DropdownItem>
                            <Divider />
                            <DropdownItem onClick={handleLogout} icon={faSignOut}>Logout</DropdownItem>
                        </DropdownMenu>
                    </>
                ) : (
                    <Button bg="red" color="white" border="none" borderRadius="5px" padding="8px 20px" fontSize="13px" fontWeight="bold" onClick={() => navigate("/login")}>
                        Sign in
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
