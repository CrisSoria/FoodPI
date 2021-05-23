const { Type } = require("../db");
const ModelCRUD = require("./index");
const typeModel = new ModelCRUD(Type);

module.exports = typeModel;
