import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { AuthContextProvider } from "./chatContext/AuthContext";
import "leaflet/dist/leaflet.css";
import { UserContextProvider } from "./chatContext/UserContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <AuthContextProvider>
        <UserContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserContextProvider>
    </AuthContextProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
