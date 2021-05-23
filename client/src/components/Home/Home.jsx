import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import Sort from "../Sort/Sort";
import Dropdown from "../Dropdown/Dropdown";
import { useSelector } from "react-redux";
import s from "./Home.module.css";

//mock
//import { recetasMock } from "../../mock/recipesMock";

function Home() {
  // data del store
  const data = useSelector((state) => state.recipesLoaded);
  //const data = recetasMock;

  //estados internos para filtar por dieta y mostar recetas ordenadas
  const [diet, setDiet] = useState("all");
  const [recipes, setRecipes] = useState(() => []);

  useEffect(() => {
    let filteredRecipes = [...data];
    if (diet !== "all") {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.diets.includes(diet)
      );
      setRecipes(filteredRecipes);
    } else {
      setRecipes(data);
    }
  }, [data, diet]);

  function handleSort(name) {
    switch (name) {
      case "asc":
        const asc = [...recipes].sort((a, b) => (a.score > b.score ? 1 : -1));
        setRecipes(asc);
        break;
      case "des":
        const des = [...recipes].sort((a, b) => (a.score < b.score ? 1 : -1));
        setRecipes(des);
        break;
      case "a-z":
        const az = [...data];
        setRecipes(az);
        break;
      case "z-a":
        const za = [...data].reverse();
        setRecipes(za);
        break;
    }
  }

  let cards;
  if (data.length > 0) {
    cards = (
      <div className={s.cnt}>
        <div className={s.options}>
          <Dropdown onChange={(value, id) => setDiet(value)} />
          <Sort onClick={(name) => handleSort(name)} />
        </div>
        <div className={s.cards}>{<Pagination recipes={recipes} />}</div>
      </div>
    );
  } else cards = <h2>No recipes to show</h2>;

  return (
    <div className={s.cnt}>
      <Search />

      <div> {cards}</div>
    </div>
  );
}

export default Home;
