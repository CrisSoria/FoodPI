import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import RecipeInstructions from "../RecipeInstructions/RecipeInstructions";
import { useDispatch } from "react-redux";
import { postRecipe } from "../../Redux/actions/actions";
import s from "./RecipeAdd.module.css";
import img from "../../assets/undraw_cooking_lyxy.svg";

////////////////////////////////////////////////////////////////
import { useHistory } from "react-router-dom";

function RecipeAdd() {
  const dispatch = useDispatch();
  //estados internos del formulario controlado
  const initialState = {
    name: "",
    summary: "",
    score: 0,
    healthScore: 0,
    instructions: [],
    types: [],
    isExternal: false,
  };
  const [state, setState] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [render, setRender] = React.useState(true);

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Name is required";
    }
    if (!input.summary) {
      errors.summary = "Summary is required";
    }
    if (isNaN(input.score)) {
      errors.score = "Score must be a number";
    }
    if (isNaN(input.healthScore)) {
      errors.healthScore = "HealtScore must be a number";
    }

    return errors;
  }

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
    setErrors(validate({ ...state, [event.target.name]: event.target.value }));
  }

  const inputs = [
    //state keys podrían ser
    "name",
    "summary",
    "score",
    "healthScore",
  ].map((e, i) => {
    return (
      <div key={i} className={s.inputlabel}>
        <label className={s.label}>{`${e}: `}</label>
        <input
          type="text"
          name={e}
          value={state[e]}
          onChange={handleChange}
          className={`${s.input} ${errors[e] && s.inpDanger}`}
        />
        {errors[e] && <p className={s.danger}>{errors[e]}</p>}
      </div>
    );
  });

  ////////////////////////////////////////////////////////////////
  const history = useHistory();
  const navigateTo = () => {
    history.push("/home");
    // history.push("/recipe/add");
  };

  function handleSubmit(event) {
    event.preventDefault();
    setRender(false);
    dispatch(postRecipe(state)).then(() => setRender(true));
    setState(initialState);
    alert("added recipe!");

    //navigateTo();
  }

  let form = (
    <form className={s.form}>
      <img src={img} alt="recipe" className={s.img} />
      <div className={s.cnt_input}>
        {inputs}

        <RecipeInstructions
          instructionsChange={(value) =>
            setState({ ...state, instructions: value })
          }
        />
        <Checkbox onChange={(value) => setState({ ...state, types: value })} />

        <button
          type="submit"
          className={s.button}
          onClick={handleSubmit}
          disabled={Object.entries(errors).length !== 0 ? true : false}
        >
          Add New Recipe
        </button>
      </div>
    </form>
  );
  return <div className={s.cnt}>{render ? form : null}</div>;
}

export default RecipeAdd;
