import React from "react";
import s from "./RecipeInstructions.module.css";

function RecipeInstructions(props) {
  const [state, setState] = React.useState([{ number: 1, step: "" }]);

  function handleChange(event) {
    let auxState = [...state];
    auxState[event.target.name].step = event.target.value;
    setState(auxState);
    props.instructionsChange(state); //puedo ponerlo en un use effect
  }

  function addStep(event) {
    event.preventDefault();
    let i = state.length + 1;
    let auxAddState = [...state];
    auxAddState.push({ number: i, step: "" });
    setState(auxAddState);
  }

  return (
    <div className={s.cnt}>
      <p className={s.ins}>Instructions:</p>
      <div className={s.labelInput}>
        {state.map((state, i) => {
          return (
            <label key={i} className={s.label}>
              {" "}
              Step {state.number}:
              <textarea
                type="textarea"
                name={state.number - 1}
                onChange={handleChange}
                className={s.textarea}
              />
            </label>
          );
        })}
      </div>
      <button onClick={addStep} className={s.button}>
        Add Step
      </button>
    </div>
  );
}

export default RecipeInstructions;
