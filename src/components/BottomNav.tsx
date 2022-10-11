import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import MapIcon from "@mui/icons-material/Map";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import styles from "../styles/BottomNav.module.css";

interface BottomNavProps {
    navigateFunction: (value: string) => void;
}

function BottomNav(props: BottomNavProps) {
    const [value, setValue] = useState(0);

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
                    label="Inicio"
                    icon={<HomeIcon />}
                    onClick={() => {
                        props.navigateFunction("home");
                    }}
                />
                <BottomNavigationAction
                    label="Buscar"
                    icon={<SearchIcon />}
                    onClick={() => {
                        props.navigateFunction("search");
                    }}
                />
                <BottomNavigationAction
                    label="Mapa"
                    icon={<MapIcon />}
                    onClick={() => {
                        props.navigateFunction("map");
                    }}
                />
                <BottomNavigationAction
                    label="Chat"
                    icon={<ChatIcon />}
                    onClick={() => {
                        props.navigateFunction("chat");
                    }}
                />
                <BottomNavigationAction
                    label="Perfil"
                    icon={<ProfileIcon />}
                    onClick={() => {
                        props.navigateFunction("profile");
                    }}
                />
            </BottomNavigation>
        </Paper>
    );
}

export default BottomNav;
