const db = require("../db/index");
const S = require("sequelize");


class Inventario extends S.Model {


}

Inventario.init({
    // Model attributes are defined here
    talle: {  //modelo+talle
      type: S.DataTypes.DECIMAL,
      allowNull: true,
  
    },
    stock: {
      type: S.DataTypes.DECIMAL,
      defaultValue: 0,
    },
  },
   {
    // Other model options go here
    sequelize: db, // We need to pass the connection instance
    modelName: "inventario" // We need to choose the model name
  }
);



module.exports = Inventario;