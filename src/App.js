import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Post from "./components/Post";
import LoginPage from "./components/LoginPage";
import Membership from "./components/Membership";
import FindPassword from "./components/FindPassword";
import MyPage, { Profile, ChangePw } from "./components/MyPage";

const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Posts />} />
          <Route path="/posting/" element={<Post />} />
        </Route>

        <Route path="/myPage/" element={<MyPage />}>
          <Route index element={<Profile />} />
          <Route path="/myPage/changePW/" element={<ChangePw />} />
        </Route>
        <Route path="/login/">
          <Route index element={<LoginPage />} />
          <Route path="/login/findpassword/" element={<FindPassword />} />
          <Route path="/login/membership/" element={<Membership />} />
        </Route>
        <Route path="/write/" element={<h2>글쓰기 페이지</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
