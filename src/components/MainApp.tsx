import PlaceReview from './reviews/PlaceReview';
import BottomNav from './BottomNav';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Map from './map/Map';
import Chat from './Chat/Chat';
import AdDetail from './advertisements/AdDetail';
import Profile from './Profile/Profile';
import SellerPage from './seller-page/SellerPage';
import EditAdDetail from './advertisements/EditAdDetail';
import { useEffect } from 'react';
import ChatMenu from './Chat/ChatMenu';

import AdvertismentHistory from './advertismentHistory/advertismentHistory';
import BuyerProfile from './Profile/BuyerProfile';
import EditProfile from './Profile/EditProfile';
import NearbyProducts from './Home/NearbyProducts';
import NewProduct from './advertisements/NewProduct';
import SellerProfile from './Profile/SellerProfile';
import SellerProducts from './Profile/SellerProducts';
import SellerReviews from './Profile/SellerReviews';
import Search from './Search/Search';

function MainApp() {
  //localStorage.clear();

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userToken');
    if (!user) {
      navigate('/login');
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
        {/* <Route path="profile" element={<Profile />} /> */}
        <Route path="profile" element={<BuyerProfile />} />
        <Route path="newproduct" element={<NewProduct />} />
        <Route path="editprofile" element={<EditProfile />} />
        <Route path="products/detail/:id" element={<AdDetail />} />
        <Route path="seller/:seller_id" element={<SellerProfile />} />
        <Route path="products/edit/:id" element={<EditAdDetail />} />
        <Route path="advertisementHistory" element={<AdvertismentHistory />} />
        <Route path="review/:purchaseId" element={<PlaceReview />} />
        <Route path="nearbyProducts" element={<NearbyProducts />} />
      </Routes>
      <BottomNav navigateFunction={navigate} />
    </>
  );
}

export default MainApp;
