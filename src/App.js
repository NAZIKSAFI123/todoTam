import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import PageTodo from "./pages/PageTodo"
import PageTodoDone from "./pages/PageTodoDone.js"

function App() {
  return (
    <BrowserRouter>
      
      <Switch>
        <Route path="/" exact component={PageTodo} />
      
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
