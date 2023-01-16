import { Layout } from "antd";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserContext from "./components/UserContext";
import AboutPage from "./views/AboutPage";
import CommunityListPage from "./views/CommunityListPage";
import CommunityPage from "./views/CommunityPage";
import Detail from './views/Detail';
import Homepage from "./views/Homepage";
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import UserPage from "./views/UserPage";

function App() {
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserName(decodedToken.username);
      setUserId(decodedToken.id);
      localStorage.setItem('userInfo', JSON.stringify({
        userName: decodedToken.username,
        userId: decodedToken.id,
      }))
    }
  }, []);

  const setToken = (token) => {
    if (!token) {
      setUserName(undefined);
      setUserId(undefined);
      localStorage.removeItem('userInfo')
      return;
    }
    const decodedToken = jwt_decode(token);
    setUserName(decodedToken.username);
    setUserId(decodedToken.id);
    localStorage.setItem('userInfo', JSON.stringify({
      userName: decodedToken.username,
      userId: decodedToken.id,
    }))
  };

  return (
    <UserContext.Provider value={{ userName, userId, setToken }}>
      <BrowserRouter>
        <Routes>
          {/* Add Routes here -> */}
          <Route
            path="/"
            element={
              <Layout>
                <Homepage></Homepage>
              </Layout>
            }
          />
          <Route path="/user/*" element={<UserPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/:communityId" element={<CommunityPage />} />
          <Route path="/communityList" element={<CommunityListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
