import BottomNav from "./BottomNav";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Map from "./Map";
import Search from "./Search";
import Chat from "./Chat";
import Profile from "./Profile/Profile";
import Register from "./Users/Register";
import Login from "./Users/Login";

function MainApp() {
    const navigate = useNavigate();

    return (
        <>
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="map" element={<Map />} />
                <Route path="search" element={<Search />} />
                <Route path="chat" element={<Chat />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>

            <BottomNav navigateFunction={navigate} />
        </>
    );
}

export default MainApp;
