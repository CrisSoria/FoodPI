import React from "react";
import { NavLink } from "react-router-dom";
import s from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={s.cnt}>
      <NavLink to="/home" className={s.link} activeClassName={s.selected}>
        Home
      </NavLink>
      <NavLink to="/recipe/add" className={s.link} activeClassName={s.selected}>
        Add Recipe
      </NavLink>
    </div>
  );
}

export default NavBar;
