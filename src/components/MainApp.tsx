import BottomNav from "./BottomNav";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Map from "./Map";
import Search from "./Search";
import Chat from "./Chat/Chat";
import AdDetail from "./advertisements/AdDetail";
import Profile from "./Profile/Profile";
import SellerPage from "./seller-page/SellerPage";
import EditAdDetail from "./advertisements/EditAdDetail";
import { useEffect } from "react";
import ChatMenu from "./Chat/ChatMenu";
import AdvertismentHistory from "./advertismentHistory/advertismentHistory";

function MainApp() {
  //localStorage.clear();

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userToken");
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="map" element={<Map />} />
        <Route path="search" element={<Search />} />
        <Route path="chat" element={<Chat />} />
        <Route path="chatmenu" element={<ChatMenu />} />
        <Route path="profile" element={<Profile />} />
        <Route path="products/detail/:id" element={<AdDetail />} />
        <Route path="seller/:id" element={<SellerPage />} />
        <Route path="products/edit/:id" element={<EditAdDetail />} />
        <Route path="advertisementHistory" element={<AdvertismentHistory />} />
      </Routes>

      <BottomNav navigateFunction={navigate} />
    </>
  );
}

export default MainApp;
