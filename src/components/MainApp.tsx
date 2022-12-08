import PlaceReview from "./reviews/PlaceReview";
import BottomNav from "./BottomNav";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Map from "./map/Map";
import Chat from "./Chat/Chat";
import AdDetail from "./advertisements/AdDetail";
import EditAdDetail from "./advertisements/EditAdDetail";
import { useEffect } from "react";
import ChatMenu from "./Chat/ChatMenu";
import AdvertismentHistory from "./advertismentHistory/advertismentHistory";
import BuyerProfile from "./Profile/BuyerProfile";
import EditProfile from "./Profile/EditProfile";
import NearbyProducts from "./Home/NearbyProducts";
import NewProduct from "./advertisements/NewProduct";
import SellerProfile from "./Profile/SellerProfile";
import OrderCard from "./Profile/OrderCard";
import Search from "./Search/Search";
import SeesLater from "./Profile/SeeLater/SeesLater";
import AdDetailLater from "./Profile/SeeLater/AdDetailLater";
import SellerSelfProfile from "./Profile/SellerSelfProfile";

function MainApp() {
    //localStorage.clear();

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("userToken");
        if (!user) {
            navigate("/login");
        }
        const role = localStorage.getItem("userRole");
        // if (role == "seller") navigate("/sellerSelfProfile");
        // else navigate("/home");
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
                <Route path="seeLater" element={<SeesLater />} />
                <Route path="products/detail/:id" element={<AdDetail />} />
                <Route path="seller/:seller_id" element={<SellerProfile />} />
                <Route
                    path="sellerSelfProfile"
                    element={<SellerSelfProfile />}
                />
                {/* <Route path="seller/:seller_id/products" element={<SellerProducts />} />
        <Route path="seller/:seller_id/reviews" element={<SellerReviews />} /> */}
                <Route path="products/edit/:id" element={<EditAdDetail />} />
                <Route
                    path="advertisementHistory"
                    element={<AdvertismentHistory />}
                />
                <Route path="review/:purchaseId" element={<PlaceReview />} />
                <Route
                    path="testest"
                    element={
                        <OrderCard
                            date="12/12/12"
                            is_ended={false}
                            price={1.66}
                            productName="Pimientos Verdes"
                            quantity={1}
                            sellerAddress="Casa"
                            sellerUsername="vendedor"
                        />
                    }
                />
                <Route path="nearbyProducts" element={<NearbyProducts />} />
            </Routes>
            <BottomNav navigateFunction={navigate} />
        </>
    );
}

export default MainApp;
