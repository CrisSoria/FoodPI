import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../Redux/actions/actions";
//import { dietsMock } from "../../mock/dietsMock";
import s from "./Dropdown.module.css";

function Dropdown(props) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.typesDiets);

  React.useEffect(() => {
    //importo los tipos de dietas
    dispatch(getTypes());
  }, []);

  return (
    <div className={s.cnt}>
      Filter by diet types:
      <select
        onChange={(e) => {
          props.onChange(e.target.value, e.target.id);
        }}
        className={s.select}
      >
        <option default value="all">
          all
        </option>
        {diets.map((d) => {
          return (
            <option key={d.id} value={d.name} id={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Dropdown;
