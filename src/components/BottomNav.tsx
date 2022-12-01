import { Paper } from "@mui/material";
import { ReactComponent as SearchIcon } from "../assets/icons/BottomNavSearchIcon.svg";
import { ReactComponent as HomeIcon } from "../assets/icons/BottomNavHomeIcon.svg";
import { ReactComponent as NotificationIcon } from "../assets/icons/BottomNavNotificationIcon.svg";
import { ReactComponent as UploadIcon } from "../assets/icons/BottomNavUploadIcon.svg";
import { ReactComponent as MapIcon } from "../assets/icons/BottomNavMapIcon.svg";
import { useState } from "react";
import useReactPath from "../hooks/useReactPath";
import React from "react";
import { useLocation } from "react-router-dom";
import UserHelper from "../libs/UserHelper";

interface BottomNavProps {
    navigateFunction: (value: string) => void;
}

function BottomNav(props: BottomNavProps) {
    const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
    const path = useReactPath();
    const [value, setValue] = useState<string>(pathname);
    const navigate = props.navigateFunction;
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [navbarStyle, setNavbarStyle] = useState<string>(
        "flex h-16 flex-row items-center justify-evenly"
    );
    const [selectedIcon, setSelectedIcon] = useState("");
    const selectedIconBase =
        "mt-1 h-1 w-6 transition-width rounded-full duration-500 ease-in-out";
    const [notSelectedIcon, setNotSelectedIcon] = useState("");
    const notselectedIconBase =
        "mt-1 h-1 w-0 transition-width rounded-full duration-300 ease-in-out";
    const individualIconStyle =
        "h-6 w-6 transition-all active:mt-1 active:h-5 active:w-5";
    const navbarDivStyle =
        "mt-2 flex h-8 w-6 cursor-pointer flex-col items-center";
    const profileStyle =
        individualIconStyle +
        " rounded-full border-2 border-solid border-black";

    const [isBuyer, setIsBuyer] = useState(false);
    const [ProfileIcon, setProfileIcon] = useState<string>("");

    const location = useLocation();
    const [iconStyle, setIconStyle] = useState({
        home: notSelectedIcon,
        search: notSelectedIcon,
        map: notSelectedIcon,
        chat: notSelectedIcon,
        newproduct: notSelectedIcon,
        profile: notSelectedIcon,
    });

    React.useEffect(() => {
        const buyer = localStorage.getItem("userRole") === "buyer";
        setIsBuyer(buyer);

        if (buyer) {
            setSelectedIcon(selectedIconBase + " bg-fresh-verde");
            setNotSelectedIcon(notselectedIconBase + " bg-fresh-verde");
        } else {
            setSelectedIcon(selectedIconBase + " bg-fresh-morado");
            setNotSelectedIcon(notselectedIconBase + " bg-fresh-morado");
        }

        UserHelper.getOwnProfile().then((profile) => {
            if (profile.profile_picture !== "") {
                UserHelper.retrieveProfilePicture(profile.profile_picture).then(
                    (image) => {
                        setProfileIcon(image);
                    }
                );
            } else {
                setProfileIcon("");
            }
        });
        updateSelectedIcon();
    }, []);

    React.useEffect(() => {
        updateSelectedIcon();
    }, [location]);

    React.useEffect(() => {
        setValue(window.location.pathname);
        updateSelectedIcon();
    }, [path]);

    React.useEffect(() => {
        updateSelectedIcon();
    }, [value]);

    function updateSelectedIcon() {
        if (pathname === "/search") {
            setIsSearch(true);
        } else {
            setIsSearch(false);
        }

        if (pathname === "/home") {
            setIconStyle({
                home: selectedIcon,
                search: notSelectedIcon,
                map: notSelectedIcon,
                chat: notSelectedIcon,
                newproduct: notSelectedIcon,
                profile: notSelectedIcon,
            });
        } else if (pathname === "/search") {
            setIconStyle({
                home: notSelectedIcon,
                search: selectedIcon,
                map: notSelectedIcon,
                chat: notSelectedIcon,
                newproduct: notSelectedIcon,
                profile: notSelectedIcon,
            });
        } else if (pathname === "/map") {
            setIconStyle({
                home: notSelectedIcon,
                search: notSelectedIcon,
                map: selectedIcon,
                chat: notSelectedIcon,
                newproduct: notSelectedIcon,
                profile: notSelectedIcon,
            });
        } else if (pathname === "/chatmenu") {
            setIconStyle({
                home: notSelectedIcon,
                search: notSelectedIcon,
                map: notSelectedIcon,
                chat: selectedIcon,
                newproduct: notSelectedIcon,
                profile: notSelectedIcon,
            });
        } else if (pathname === "/newproduct") {
            setIconStyle({
                home: notSelectedIcon,
                search: notSelectedIcon,
                map: notSelectedIcon,
                chat: notSelectedIcon,
                newproduct: selectedIcon,
                profile: notSelectedIcon,
            });
        } else if (pathname === "/profile") {
            setIconStyle({
                home: notSelectedIcon,
                search: notSelectedIcon,
                map: notSelectedIcon,
                chat: notSelectedIcon,
                newproduct: notSelectedIcon,
                profile: selectedIcon,
            });
        }
    }

    React.useEffect(() => {
        if (isSearch) {
            setNavbarStyle(
                "flex h-16 flex-row items-center justify-evenly bg-fresh-fondo-azul"
            );
        } else {
            setNavbarStyle(
                "flex h-16 flex-row items-center justify-evenly bg-white"
            );
        }
    }, [isSearch]);

    return (
        <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={0}
        >
            <div className={navbarStyle}>
                {isBuyer && (
                    <div className={navbarDivStyle}>
                        <HomeIcon
                            className={individualIconStyle}
                            onClick={() => {
                                navigate("/home");
                            }}
                        />
                        <div className={iconStyle.home}></div>
                    </div>
                )}

                {isBuyer && (
                    <div className={navbarDivStyle}>
                        <SearchIcon
                            className={individualIconStyle}
                            onClick={() => {
                                navigate("/search");
                            }}
                        />
                        <div className={iconStyle.search}></div>
                    </div>
                )}
                {isBuyer && (
                    <div className={navbarDivStyle}>
                        <MapIcon
                            className={individualIconStyle}
                            onClick={() => {
                                navigate("/map");
                            }}
                        />
                        <div className={iconStyle.map}></div>
                    </div>
                )}

                <div className={navbarDivStyle}>
                    <NotificationIcon
                        className={individualIconStyle}
                        onClick={() => {
                            navigate("/chatmenu");
                        }}
                    />
                    <div className={iconStyle.chat}></div>
                </div>

                {!isBuyer && (
                    <div className={navbarDivStyle}>
                        <UploadIcon
                            className={individualIconStyle}
                            onClick={() => {
                                navigate("/newproduct");
                            }}
                        />
                        <div className={iconStyle.newproduct}></div>
                    </div>
                )}

                <div className={navbarDivStyle}>
                    {ProfileIcon !== "" && (
                        <img
                            src={ProfileIcon}
                            alt="profile"
                            className={profileStyle}
                            onClick={() => {
                                navigate("/profile");
                            }}
                        />
                    )}
                    {ProfileIcon === "" && <div className={profileStyle}></div>}
                    <div className={iconStyle.profile}></div>
                </div>
            </div>

            {/* <BottomNavigation
                value={value}
                onChange={handleChange}
                
                sx={{ backgroundColor: "E0F4FC" }}
            >
                <BottomNavigationAction
                    icon={<HomeIcon />}
                    value="/home"
                    onClick={() => props.navigateFunction("/home")}
                />
                {isBuyer && (
                    <BottomNavigationAction
                        icon={<SearchIcon />}
                        value="/search"
                        onClick={() => {
                            props.navigateFunction("/search");
                            setIsSearch(true);
                        }}
                    />
                )}
                {isBuyer && (
                    <BottomNavigationAction
                        icon={<MapIcon />}
                        value="/map"
                        onClick={() => props.navigateFunction("/map")}
                    />
                )}
                <BottomNavigationAction
                    icon={<ChatIcon />}
                    value="/chatmenu"
                    onClick={() => props.navigateFunction("/chatmenu")}
                />
                <BottomNavigationAction
                    icon={<ProfileIcon />}
                    onClick={() => {
                        props.navigateFunction("profile");
                    }}
                    value="/profile"
                />
            </BottomNavigation> */}
        </Paper>
    );
}

export default BottomNav;
