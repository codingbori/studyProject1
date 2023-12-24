import { Outlet } from "react-router-dom";
import Header from "./Header";

const Home = (props) => {
  return (
    <>
      <Header
        setSearch={props.setSearch}
        setCurrentPage={props.setCurrentPage}
        setPost={props.setPost}
      />
      <Outlet />
    </>
  );
};

export default Home;
