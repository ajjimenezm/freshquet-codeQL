import BottomNav from "./BottomNav";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Map from "./Map";
import Search from "./Search";
import Chat from "./Chat/Chat";
import Profile from "./Profile";
import Login from "./users/Login";
import Register from "./users/Register";
import AdDetail from "./advertisements/AdDetail";
import ChatMenu from "./Chat/ChatMenu";

function MainApp() {
    const navigate = useNavigate();

    return (
        <>
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="map" element={<Map />} />
                <Route path="search" element={<Search />} />
                <Route path="chatmenu" element={<ChatMenu />} />
                <Route path="chat" element={<Chat />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="products/detail/:id" element={<AdDetail />} />
            </Routes>

            <BottomNav navigateFunction={navigate} />
        </>
    );
}

export default MainApp;
