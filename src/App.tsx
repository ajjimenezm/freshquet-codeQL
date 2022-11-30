import React from "react";
import { Routes, Route } from "react-router-dom";
import MainApp from "./components/MainApp";
import "./styles/App.css";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import NewProduct from "./components/advertisements/NewProduct";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import { AuthContext } from "./chatContext/AuthContext";
import BuyAd from "./components/advertisements/BuyAdvertisement/BuyAdDialog";
import AdvertismentHistory from "./components/advertismentHistory/advertismentHistory";
import NearbyProducts from "./components/Home/NearbyProducts";

function App() {
    const [isBuyer, setIsBuyer] = React.useState<boolean>(false);

    const buyerTheme = createTheme({
        palette: {
            primary: {
                main: "#63d4a1",
            },
        },
    });

    const sellerTheme = createTheme({
        palette: {
            primary: {
                main: "#976D9C",
            },
        },
    });

    React.useEffect(() => {
        setIsBuyer(localStorage.getItem("userRole") === "buyer");
    }, []);

    const user = React.useContext(AuthContext);

    return (
        <ThemeProvider theme={isBuyer ? buyerTheme : sellerTheme}>
            <div className="App">
                <Routes>
                    {/* <Route path="/" element={<InitialScreen setRole={setRole} />} /> */}
                    <Route path="/" element={<MainApp />} />
                    <Route path="*" element={<MainApp />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="newproduct" element={<NewProduct />} />
                    <Route path="products/buy/:id" element={<BuyAd />} />
                    <Route
                        path="advertismentHistory"
                        element={<AdvertismentHistory />}
                    />
                    <Route path="nearbyProducts" element={<NearbyProducts />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
