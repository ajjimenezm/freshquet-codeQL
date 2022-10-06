import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import MapIcon from "@mui/icons-material/Map";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import styles from "../styles/BottomNav.module.css";
import { useRouter } from "next/router";

interface BottomNavProps {
    value: number;
}

function BottomNav(props: BottomNavProps) {
    const [value, setValue] = useState(props.value);
    const router = useRouter();

    const onLink = (href: string) => {
        router.push(href);
    };

    return (
        <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    label="Home"
                    icon={<HomeIcon />}
                    onClick={() => onLink("/home")}
                />

                <BottomNavigationAction
                    label="Search"
                    icon={<SearchIcon />}
                    onClick={() => onLink("/search")}
                />
                <BottomNavigationAction
                    label="Map"
                    icon={<MapIcon />}
                    onClick={() => onLink("/map")}
                />
                <BottomNavigationAction
                    label="Chat"
                    icon={<ChatIcon />}
                    onClick={() => onLink("/chat")}
                />
                <BottomNavigationAction
                    label="Profile"
                    icon={<ProfileIcon />}
                    onClick={() => onLink("/profile")}
                />
            </BottomNavigation>
        </Paper>
    );
}

export default BottomNav;
