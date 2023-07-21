import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/layout/Header";
import Tododone from "../components/tododone.js"
import NavBar from "../components/layout/navBar"

function PageTodoDone() {
  return (
    <>
    <Header/>
    <div className="container">
     <NavBar/>
      <Tododone/>
      </div>
    </>
  );
}

export default PageTodoDone;
