const { Router } = require("express");
const Sequelize = require("sequelize");
const fetch = require("node-fetch");
const recipeModel = require("../controllers/recipe");
const router = Router();
const { Type } = require("../db");

// const apiKey = "9995c295ce474b5aaade3955001ac163";
require("dotenv").config();
const { YOUR_API_KEY } = process.env;
apiKey = YOUR_API_KEY;

// GET /recipe?name="...": listado 9 primeras recetas que contengan la palabra pasada por query
router.get("/", (req, res) => {
  const name = req.query.name;

  //buscando en API externa
  const api = fetch(
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      apiKey +
      "&query=" +
      name +
      "&addRecipeInformation=true"
  )
    .then((r) => r.json())
    .then((data) => {
      //console.log(data);
      const recipes = data.results;
      let mock = [];

      recipes.map((recipe) => {
        let aux = {};
        // spread operator seguro es mejor
        aux.id = recipe.id;
        aux.name = recipe.title;
        aux.image = recipe.image;
        aux.diets = recipe.diets;
        aux.score = recipe.spoonacularScore;
        aux.isExternal = true;

        mock.push(aux);
      });
      return mock;
    })
    .catch((err) => {
      console.error(err);
      res.send(err).status(400);
    });

  //buscando en DB
  const db = recipeModel
    .get({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`,
        },
      },
      include: { model: Type },
    })
    .then((recipes) => {
      recipes.forEach((recipe) => {
        let auxDiets = recipe.types.map((t) => {
          return t.name;
        });
        console.log(auxDiets);
        recipe.diets = auxDiets;
      });
      //console.log(recipes);
      return recipes;
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });

  //realizo las busquedas
  return Promise.all([api, db]).then((results) => {
    const [api, db] = results;
    const recipes = api.concat(db);
    const aux = recipes.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
    res.json(aux);
  });
});

//GET /recipes/{idReceta}:
router.get("/:idReceta", (req, res) => {
  const id = req.params.idReceta;
  const isExternal = req.query.isExternal; //flag

  if (isExternal) {
    fetch(
      "https://api.spoonacular.com/recipes/" +
        id +
        "/information?apiKey=" +
        apiKey
    )
      .then((r) => r.json())
      .then((recipe) => {
        let aux = {};
        // spread operator seguro es mejor
        //aux.id = recipe.id;
        aux.name = recipe.title;
        aux.image = recipe.image;
        aux.diets = recipe.diets;
        aux.score = recipe.spoonacularScore;
        aux.isExternal = true;
        aux.summary = recipe.summary;
        aux.healthScore = recipe.healthScore;
        aux.instructions = recipe.analyzedInstructions[0].steps;

        res.send(aux);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
    return;
  }
  recipeModel
    .get({
      where: { id },
      include: { model: Type },
    })
    .then((arrayRecipe) => {
      let recipe = arrayRecipe[0];
      // let auxDiets = recipe.types.map((t) => {
      //   return t.name;
      // });
      // recipe.diets = auxDiets;
      // console.log("back receta detalle por id", recipe);
      res.send(recipe);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
});

module.exports = router;
