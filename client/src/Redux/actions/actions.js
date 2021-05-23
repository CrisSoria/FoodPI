// action creators: describen lo  que va a suceder
import {
  SEARCH_RECIPES,
  POST_RECIPE,
  GET_TYPES,
  GET_RECIPE,
} from "../actions/constants";

export function searchRecipes(name) {
  return function (dispatch) {
    return fetch("http://localhost:3001/recipes?name=" + name)
      .then((response) => response.json())
      .then((json) => {
        //como no lo ejecuta correctamente en el back lo repito
        json.forEach((recipe) => {
          if (recipe.isExternal === false) {
            let auxDiets = recipe.types.map((t) => {
              return t.name;
            });
            recipe.diets = auxDiets;
          }
        });
        dispatch({ type: SEARCH_RECIPES, payload: json });
        return json;
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function postRecipe(recipe) {
  return function (dispatch) {
    return fetch("http://localhost:3001/recipe", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })
      .then(function (response) {
        if (response.ok) {
          return response.text();
        } else {
          throw "Error en la llamada Ajax";
        }
      })
      .then((json) => {
        dispatch({ type: POST_RECIPE, payload: json });
      })
      .catch(function (err) {
        console.log(err);
      });
  };
}

export function getTypes() {
  return function (dispatch) {
    return fetch("http://localhost:3001/types")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_TYPES, payload: json });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function getRecipe(id, isExternal) {
  let flag = "";
  isExternal == "true" ? (flag = "?isExternal=true") : (flag = "");

  return function (dispatch) {
    return fetch("http://localhost:3001/recipes/" + id + flag)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_RECIPE, payload: json });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
