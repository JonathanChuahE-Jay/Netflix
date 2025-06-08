import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useBreakpoint from "../components/breakpoint/UseBreakpoint";
import { logout } from "../redux/AuthSlice";

const useNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [unseenNotifications, setUnseenNotifications] = useState(0);

    const user = useSelector((state) => state.auth.user);
    const profiles = useSelector((state) => state.auth.profile);

    const dispatch = useDispatch();
    const breakpoint = useBreakpoint();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const Notification = useMemo(() => [
        { id: 1, message: "New comment on your post.", isSeen: false },
        { id: 2, message: "Your profile has been updated.", isSeen: true },
        { id: 3, message: "New follower: John Doe.", isSeen: true },
        { id: 4, message: "Your subscription is about to expire.", isSeen: true },
        { id: 5, message: "System update completed successfully.", isSeen: false }
    ], []);

    useEffect(() => {
        setUnseenNotifications(Notification.filter((notif) => !notif.isSeen).length);
    }, [Notification]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const Links = [
        { name: "Home", to: "/" },
        { name: "TV Shows", to: "tv-shows" },
        { name: "Movies", to: "/movies"},
        { name: "New & Popular", to: "/new-popular"  },
        { name: "My List", to: "/my-list" },
        { name: "Browse by Languages", to: "/browse" },
    ];

    return {
        isScrolled,
        unseenNotifications,
        user,
        profiles,
        breakpoint,
        Notification,
        Links,
        handleLogout,
        navigate
    };
};

export default useNavbar;
