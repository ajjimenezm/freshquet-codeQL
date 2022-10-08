import React from "react";
import { Routes, Route } from "react-router-dom";
import InitialScreen from "./components/InitialScreen";
import MainApp from "./components/MainApp";
import "./styles/App.css";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<InitialScreen />} />
                <Route path="*" element={<MainApp />} />
            </Routes>
        </div>
    );
}

export default App;
