import React from "react";
import { Link } from "react-router-dom";
import s from "./Recipe.module.css";

function Recipe({ id, image, name, diets, score, isExternal, types }) {
  let typesDiets = [];
  if (isExternal) {
    typesDiets = diets.map((d, i) => {
      let outSpaces = d.split(" ").join("");
      return (
        <span key={i} className={`${s.span} ${s[outSpaces]}`}>
          {d}
        </span>
      );
    });
  } else {
    typesDiets = types.map((t, i) => {
      let outSpaces = t.name.split(" ").join("");
      return (
        <span key={i} className={`${s.span} ${s[outSpaces]}`}>
          {t.name}
        </span>
      );
    });
  }
  return (
    <div key={id} className={s.cnt}>
      <img src={image} className={s.img} />
      <div className={s.description}>
        <Link to={`/recipe/${id}/${isExternal}`}>
          <h4 className={s.name}>{name}</h4>
        </Link>
        <p className={s.score}>score: {score}</p>
        <div className={s.typesDiets}>{typesDiets}</div>
      </div>
    </div>
  );
}

export default Recipe;
