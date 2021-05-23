import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../Redux/actions/actions";
import s from "./Checkbox.module.css";

function Checkbox(props) {
  const [dietsSelected, setDietsSelected] = React.useState([]);
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.typesDiets);

  React.useEffect(() => {
    dispatch(getTypes());
  }, []);

  //envio al componente padre las dietas seleccionadas
  React.useEffect(() => {
    props.onChange(dietsSelected);
  }, [dietsSelected]);

  function onCheck(event) {
    if (event.target.checked) {
      setDietsSelected([...dietsSelected, event.target.id]);
    } else {
      let aux = [...dietsSelected].filter((id) => {
        return id != event.target.id;
      });
      setDietsSelected(aux);
    }
  }

  return (
    <div className={s.cnt}>
      {diets.map((d, i) => {
        return (
          <label key={i} className={s.label}>
            <input
              type="checkbox"
              name={d.name}
              id={d.id}
              value={d.name}
              // checked={checkbox[d]}
              onChange={(e) => onCheck(e)}
              className={s.input}
            />
            {d.name}
          </label>
        );
      })}
    </div>
  );
}

export default Checkbox;
