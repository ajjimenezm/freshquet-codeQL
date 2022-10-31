import React from "react";
import { Routes, Route } from "react-router-dom";
import MainApp from "./components/MainApp";
import "./styles/App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NewProduct from "./components/advertisements/NewProduct";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import { AuthContext } from "./chatContext/AuthContext";

function App() {
  // useContext user authcontext

  const user = React.useContext(AuthContext);
  console.log(user);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#63d4a1",
      },
      secondary: {
        main: "#D46496",
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          {/* <Route path="/" element={<InitialScreen setRole={setRole} />} /> */}
          <Route path="/" element={<MainApp />} />
          <Route path="*" element={<MainApp />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="newproduct" element={<NewProduct />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
