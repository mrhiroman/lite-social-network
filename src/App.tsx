import React from 'react';

import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { FriendsPage } from './pages/FriendsPage';
import { NewsPage } from './pages/NewsPage';
import { Header } from './components/layout/Header';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from './redux/store';
import { OpenAPI, UserService } from './generated/api';
import { setCurrentUser, setSigninState } from './redux/user/slice';
import { MessagesPage } from './pages/MessagesPage';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      OpenAPI.TOKEN = token;
      UserService.getApiUsersMe()
        .then((response) => {
          dispatch(setCurrentUser(response));
          dispatch(setSigninState(true));
          console.log(token);
          if (location.pathname === '/') navigate('/profile');
        })
        .catch((err) => {
          console.log('Token is expired, please log in again');
        });
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
      </Routes>
    </div>
  );
}

export default App;
