import "./App.css";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import RecipeAdd from "./components/RecipeAdd/RecipeAdd";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/recipe/:id/:isExternal" component={RecipeDetail} />
      <Route exact path="/recipe/add" component={RecipeAdd} />
    </div>
  );
}
export default App;
