const { Router } = require("express");
const typeModel = require("../controllers/type");
const router = Router();
//const { Recipe } = require("../db");

//GET /types: obtener todos los tipos
router.get("/", (req, res) => {
  typeModel
    .get(/*{ include: { model: Recipe } }*/)
    .then((types) => {
      //console.log(types);
      res.send(types);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
});

module.exports = router;
