import React from "react";
import Loading from "../Loading/Loading";
import { getRecipe } from "../../Redux/actions/actions.js";
import { useDispatch, useSelector } from "react-redux";
import s from "./RecipeDetail.module.css";

function RecipeDetail({ match }) {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const recipeDetails = useSelector((state) => state.recipeDetails);
  //console.log("receta detalle del estado redux", recipeDetails);

  const id = match.params.id;
  const isExternal = match.params.isExternal; //revisar si el flag puede ser mejor
  React.useEffect(() => {
    //console.log("la receta elegida es id", id, "isExternal", isExternal);
    dispatch(getRecipe(id, isExternal));
    //console.log("luego de dispatch", recipeDetails);
    setLoading(false);
  }, []);
  var summary = ""; //variable almacena resumen
  var steps = ""; //variable almacena instruciones
  var dietsTypes = ""; //variable almacena tipos de dietas asociados

  if (recipeDetails.isExternal === true) {
    // parseo sacando tags html
    var htmlTagRe = /<\/?[\w\s="/.':;#-\/]+>/gi;
    var html = recipeDetails.summary;
    var plainText = html.replace(htmlTagRe, "");

    summary = plainText;

    dietsTypes = recipeDetails.diets.map((diet, i) => {
      let outSpaces = diet.split(" ").join("");
      return (
        <span key={i} className={`${s.span} ${s[outSpaces]}`}>
          {diet}
        </span>
      );
    });

    // esto será general luego de modificar el form de posteo
    /* steps = recipeDetails.instructions.map((step, i) => {
      return (
        <div key={i}>
          <div>number: {step.number}</div>
          <div>step: {step.step}</div>
        </div>
      );
    }); */
  }

  if (recipeDetails.isExternal === false) {
    summary = recipeDetails.summary;

    let dietas = recipeDetails.types.map((t) => {
      return t.name;
    });
    dietsTypes = dietas.map((diet, i) => {
      let outSpaces = diet.split(" ").join("");
      return (
        <span key={i} className={`${s.span} ${s[outSpaces]}`}>
          {diet}
        </span>
      );
    });

    // steps = <div>{recipeDetails.instructions}</div>;
  }
  if (recipeDetails.instructions) {
    steps = recipeDetails.instructions.map((step, i) => {
      return (
        <div className={s.stepCnt} key={i}>
          <div className={s.stepNum}>Step N°: {step.number}</div>
          <div className={s.stepText}>{step.step}</div>
        </div>
      );
    });
  }

  let renderDetail;
  console.log(loading);
  if (loading === true) {
    renderDetail = <Loading />;
  } else {
    renderDetail = (
      <div className={s.cnt}>
        <img src={recipeDetails.image} alt="recipe image" className={s.image} />

        <div className={s.container}>
          <h3 className={s.title}>{recipeDetails.name}</h3>
          <div className={s.diets}>
            Diets:
            {dietsTypes}
          </div>
          <p className={s.score}>Score: {recipeDetails.score}</p>
          <p className={s.healthScore}>
            Health Score: {recipeDetails.healthScore}
          </p>
          <p className={s.summary}>Summary: {summary}</p>
        </div>

        <div className={s.instructions}>
          <p className={s.pIns}>Instructions:</p>
          {steps}
        </div>
      </div>
    );
  }
  return renderDetail;
}

export default RecipeDetail;
