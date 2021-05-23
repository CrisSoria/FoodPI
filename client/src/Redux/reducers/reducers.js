// generar un NUEVO ESTADO y pisar el anterior
import {
  POST_RECIPE,
  SEARCH_RECIPES,
  GET_TYPES,
  GET_RECIPE,
} from "../actions/constants";

const initialState = {
  recipesLoaded: [],
  recipeDetails: {},
  typesDiets: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RECIPES:
      return {
        ...state,
        recipesLoaded: action.payload,
      };
    case POST_RECIPE:
      return {
        ...state,
      };
    case GET_TYPES:
      return {
        ...state,
        typesDiets: action.payload,
      };
    case GET_RECIPE:
      return {
        ...state,
        recipeDetails: action.payload,
      };

    default:
      return state;
  }
}
