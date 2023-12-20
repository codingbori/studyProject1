import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">홈입니다</Link>
          </li>
          <li>
            <Link to="blogs">블로그입니다</Link>
          </li>
          <li>
            <Link to="apple">사과더근본</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h2>Home</h2>} />
          <Route
            path="blogs"
            element={
              <div>
                <h2>Blogs</h2>
                <Link to="kiwk">키위로 가는 길</Link>
              </div>
            }
          >
            <Route path="kiwi" element={<h2>Kiwies</h2>} />
          </Route>
          <Route path="apple" element={<h2>Apple</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;