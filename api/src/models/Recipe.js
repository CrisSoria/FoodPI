const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //resumen del plato
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    //spoonacularScore
    score: {
      type: DataTypes.FLOAT,
    },
    //(nivel de comida saludable)
    healthScore: {
      type: DataTypes.FLOAT,
    },
    //analizedInstructions (paso a paso)
    instructions: {
      type: DataTypes.JSON,
    },
    //indica donde está almacenada la receta
    isExternal: {
      type: DataTypes.BOOLEAN,
    },
  });
};
