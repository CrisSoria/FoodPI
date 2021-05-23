import React from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../../Redux/actions/actions.js";
import s from "./Search.module.css";

////////////////////////////////////////////////////////////////
import Loading from "../Loading/Loading";

function Search(props) {
  //debe ser un formulario controlado que submitee el estado interno del input
  //dispatchando un serchRecipes
  const [search, setSearch] = React.useState("");
  //////////////////////////////
  const [buscando, setBuscando] = React.useState(false);
  const dispatch = useDispatch();

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function handleSearch(event) {
    event.preventDefault();
    setBuscando(true);
    // props.onClick(true);
    dispatch(searchRecipes(search)).then((res) => {
      // console.log("dispatch busqueda", res);
      setBuscando(false);
      // res.length > 0 ? setBuscando(false) : setSearch(true);
    });
    setSearch("");
  }
  return (
    <div className={s.cnt}>
      <form className={s.form}>
        <input
          type="search"
          name="buscador"
          id="search"
          placeholder="Search recipe"
          value={search}
          onChange={handleChange}
          className={s.input}
        />
        <button onClick={handleSearch} className={s.button}>
          Search
        </button>
      </form>
      <div>{buscando ? <Loading /> : null}</div>
    </div>
  );
}

export default Search;
