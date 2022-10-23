import BottomNav from './BottomNav';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Map from './Map';
import Search from './Search';
import Chat from './Chat';
import Login from './users/Login';
import Register from './users/Register';
import AdDetail from './advertisements/AdDetail';
import Profile from './Profile/Profile';
import SellerPage from './seller-page/SellerPage';
import EditAdDetail from './advertisements/EditAdDetail';
import { useEffect } from 'react';

function MainApp() {
  //localStorage.clear();

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userToken');
    if (!user) {
      navigate('/login');
    } else navigate('/home');
  }, []);

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
        <Route path="products/detail/:id" element={<AdDetail />} />
        <Route path="seller/:id" element={<SellerPage />} />
        <Route path="products/edit/:id" element={<EditAdDetail />} />
       </Routes>

      <BottomNav navigateFunction={navigate} />
    </>
  );
}

export default MainApp;
