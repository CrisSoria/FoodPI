import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import Recipe from "./Recipe";
import { Link } from "react-router-dom";
import { recetasMock } from "../../mock/recipesMock";

describe("<Recipe />", () => {
  let wrapper;
  let r = recetasMock[0];
  beforeEach(() => {
    wrapper = shallow(
      <Recipe
        id={r.id}
        image={r.image}
        name={r.name}
        diets={r.diets}
        score={r.score}
        isExternal={r.isExternal}
        types={r.diets}
      />
    );
  });

  it("debería renderizar una img ", () => {
    expect(wrapper.find("img")).toHaveLength(1);
  });

  it('deberia renderizar un "p" que contenga el "score" que recibe por props', () => {
    expect(wrapper.find("p")).toHaveLength(1);
    expect(wrapper.find("p").at(0).text()).toEqual("score: " + r.score);
  });

  it("deberia renderizar un componente <Link>", () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it('El <Link> deberia redirigir a "/edit/:id/:isExternal", y que el "id" matchee el id de cada Todo', () => {
    expect(wrapper.find(Link).at(0).prop("to")).toEqual(
      `/recipe/${r.id}/${r.isExternal}`
    );
  });

  it(`debería renderizar un "span" por cada tipo de dieta`, () => {
    expect(wrapper.find("span")).toHaveLength(r.diets.length);
    expect(wrapper.find("span").at(0).text()).toEqual(r.diets[0]);
  });
});
