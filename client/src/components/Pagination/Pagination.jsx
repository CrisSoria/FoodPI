import React from "react";
import Recipe from "../Recipe/Recipe";
import s from "./Pagination.module.css";

const pageSize = 2;

function Paginate({ recipes }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [renderRecipes, setRenderRecipes] = React.useState([]);
  let maxPages = Math.ceil(recipes.length / pageSize); // devidir cantidad de pag por mostradas

  React.useEffect(() => {
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    //console.log("entre", startIndex, endIndex);
    setRenderRecipes([...recipes].slice(startIndex, endIndex));
  }, [currentPage, recipes]);

  let items = []; // numeros de paginación
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;

  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={
          number === currentPage
            ? s.round_effect + " " + s.active
            : s.round_effect
        }
        onClick={() => {
          setCurrentPage(number);
        }}
      >
        {number}
      </div>
    );
  }
  if (maxPages === 1)
    items = (
      <div key={1} className={s.round_effect + " " + s.active}>
        1
      </div>
    );

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginationRender = (
    <div className={s.flex_container}>
      <div>
        {" "}
        <div className={s.cards}>
          {renderRecipes.map((r, i) => {
            return (
              <Recipe
                key={i}
                id={r.id}
                image={r.image}
                name={r.name}
                diets={r.diets}
                score={r.score}
                isExternal={r.isExternal}
                types={r.types}
              />
            );
          })}
        </div>
      </div>

      <div className={s.paginate_ctn}>
        <div className={s.round_effect} onClick={prevPage}>
          {" "}
          &lsaquo;{" "}
        </div>
        {items}
        <div className={s.round_effect} onClick={nextPage}>
          {" "}
          &rsaquo;{" "}
        </div>
      </div>
    </div>
  );

  return paginationRender;
}

export default Paginate;
