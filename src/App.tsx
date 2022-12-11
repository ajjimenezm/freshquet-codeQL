import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainApp from './components/MainApp';
import './styles/App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './components/users/Login';
import Register from './components/users/Register';
import { AuthContext } from './chatContext/AuthContext';
import AdvertismentHistory from './components/advertismentHistory/advertismentHistory';
import './styles/App.css';

function App() {
  const user = React.useContext(AuthContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4C987B',
      },
      secondary: {
        main: '#976D9C',
      },
      success: {
        main: '#4C987B',
      },
      error: {
        main: '#F4511D',
      },
    },
    typography: {
      fontFamily: 'Outfit, sans-serif',
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
          <Route path="advertismentHistory" element={<AdvertismentHistory />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
