import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Post from "./components/Post";
import LoginPage from "./components/LoginPage";
import Membership from "./components/Membership";
import FindPassword from "./components/FindPassword";
import MyPage, { Profile, ChangePw } from "./components/MyPage";
import Write from "./components/Write";
import PageNotForFound from "./components/PageNotForFound";
import { useState } from "react";

const App = () => {
  const [popup, changePopup] = useState(false);
  const setPopup = () => {
    changePopup(!popup);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home popup={popup} setPopup={setPopup} />}>
          <Route index element={<Posts />} />
          <Route path="/:category/" element={<Posts />} />
          <Route path="/mypost/:userid/" element={<Posts />} />
          <Route path="/search/:searched/" element={<Posts />} />
          <Route path="/posts/" element={<Post setPopup={setPopup} />} />
        </Route>

        <Route path="/mypage/:user/" element={<MyPage />}>
          <Route index element={<Profile />} />
          <Route path="/mypage/:user/changePW/" element={<ChangePw />} />
        </Route>
        <Route path="/login/">
          <Route index element={<LoginPage />} />
          <Route path="/login/findpassword/" element={<FindPassword />} />
          <Route path="/login/membership/" element={<Membership />} />
        </Route>
        <Route path="/write/" element={<Write />} />
        <Route path="*" element={<PageNotForFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
