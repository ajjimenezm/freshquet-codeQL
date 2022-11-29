import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import MapIcon from "@mui/icons-material/Map";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import { SetStateAction, useState } from "react";
import useReactPath from "../hooks/useReactPath";

import React from "react";
import axios from "axios";

interface BottomNavProps {
    navigateFunction: (value: string) => void;
}

function BottomNav(props: BottomNavProps) {
    const [isBuyer, setIsBuyer] = useState<boolean>(false);

    const [color, setColor] = useState<string>("#976D9C");

    React.useEffect(() => {
        getUserType();
    }, []);

    const getUserType = () => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/type`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "userToken"
                    )}`,
                },
            })
            .then((res) => {
                setIsBuyer(res.data.userRole.toLowerCase() === "buyer");
            });
    };

    const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
    const path = useReactPath();

    React.useEffect(() => {
        setValue(window.location.pathname);
    }, [path]);

    const [value, setValue] = useState(pathname);

    const handleChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: SetStateAction<string>
    ) => {
        setValue(value);
    };

    return (
        <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={0}
        >
            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction
                    icon={<HomeIcon />}
                    value="/home"
                    onClick={() => props.navigateFunction("/home")}
                />
                {isBuyer && (
                    <BottomNavigationAction
                        icon={<SearchIcon />}
                        value="/search"
                        onClick={() => props.navigateFunction("/search")}
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
                    color={color}
                />
            </BottomNavigation>
        </Paper>
    );
}

export default BottomNav;
