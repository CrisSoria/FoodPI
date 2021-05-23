import React from "react";
import s from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={s.outer}>
      <div className={s.middle}>
        <div className={s.inner}></div>
      </div>
    </div>
  );
}
