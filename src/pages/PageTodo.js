import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/layout/Header";
import Todo from "../components/todo/Todo"
import NavBar from "../components/layout/navBar"

function PageTodo() {
  return (
    <>
    <Header/>
      <Todo/>
      
    </>
  );
}

export default PageTodo;
