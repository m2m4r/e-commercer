const db = require("../db/index");
const S = require("sequelize");


class Productos extends S.Model {


}

Productos.init({
    // Model attributes are defined here
    modelo: {
      type: S.DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: S.DataTypes.DECIMAL,
      defaultValue: 0,
    },
    image_url: {
      type: S.DataTypes.ARRAY(S.DataTypes.STRING),
      defaultValue: [
        "https://us.123rf.com/450wm/flippo/flippo0907/flippo090700009/5193166-una-de-las-apuestas-demasiado-rojo-y-zapatos-de-payaso-amarillo-sobre-un-fondo-blanco.jpg?ver=6",
      ],
    },

   /*  stock: {
      type: S.DataTypes.ARRAY(S.DataTypes.DECIMAL),
      defaultValue:[]
      
    },
    talle: {
      type: S.DataTypes.VIRTUAL,
    },
    cantidad: {
      type: S.DataTypes.VIRTUAL,
    }, */

    marca: {
      type: S.DataTypes.STRING,
    },

    descripcion: {
      type: S.DataTypes.TEXT,
      defaultValue: "descripcion",
    },

  },
  {
    // Other model options go here
    sequelize: db, // We need to pass the connection instance
    modelName: "productos" // We need to choose the model name
  }
);

/* Productos.beforeCreate((productos, options) => {
 
  productos.stock[productos.talle] = productos.cantidad;
 
});

Productos.beforeUpdate((productos, options) => {
  console.log("entre al update",productos.talle)
  productos.stock[productos.talle] = productos.cantidad;
  console.log(productos )
}); */

module.exports = Productos;
