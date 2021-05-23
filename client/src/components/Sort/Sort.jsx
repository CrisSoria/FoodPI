import React from "react";
import s from "./Sort.module.css";

function Sort(props) {
  return (
    <div className={s.cnt}>
      Order by score:
      <button
        name="asc"
        onClick={(e) => {
          props.onClick(e.target.name);
        }}
        className={`${s.button} ${s.asc}`}
      >
        ASC
      </button>
      <button
        name="des"
        onClick={(e) => {
          props.onClick(e.target.name);
        }}
        className={`${s.button} ${s.des}`}
      >
        DES
      </button>
      Order by name:
      <button
        name="a-z"
        onClick={(e) => {
          props.onClick(e.target.name);
        }}
        className={`${s.button} ${s.a_z}`}
      >
        A-Z
      </button>
      <button
        name="z-a"
        onClick={(e) => {
          props.onClick(e.target.name);
        }}
        className={`${s.button} ${s.z_a}`}
      >
        Z-A
      </button>
    </div>
  );
}

export default Sort;
