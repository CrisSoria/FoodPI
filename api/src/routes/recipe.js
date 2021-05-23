const { Router } = require("express");
const router = Router();
const recipeModel = require("../controllers/recipe");

// POST /recipe: datos por body y crea una nueva receta
router.post("/", (req, res) => {
  const recipe = req.body;
  const { types } = req.body;
  recipeModel
    .add(recipe)
    .then((newRecipe) => {
      types.map((t) => newRecipe.addTypes(t));
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
});

module.exports = router;
