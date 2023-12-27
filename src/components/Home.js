import { Outlet } from "react-router-dom";
import Header from "./Header";

const Home = (props) => {
  return (
    <>
      <Header popup={props.popup} setPopup={props.setPopup} />
      <Outlet />
    </>
  );
};

export default Home;
