import React from "react";
import { Link } from "react-router-dom";
import s from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={s.container}>
      <div className={s.cnt}>
        <h1 className={s.title}>Cooking is fun!</h1>
        <h3>Easy recipes for family cooking</h3>
        <p className={s.parrafo}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero nostrum
          quis, odio veniam itaque ullam debitis qui magnam consequatur ab. Vero
          nostrum quis, odio veniam itaque ullam debitis qui magnam consequatur
          ab.
        </p>
        <br />
        <Link to="/home">
          <button className={s.button}>Explore Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
