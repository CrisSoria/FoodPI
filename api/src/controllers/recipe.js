const { Recipe } = require("../db");
const ModelCRUD = require("./index");
const recipeModel = new ModelCRUD(Recipe);

module.exports = recipeModel;
