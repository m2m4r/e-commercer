const db = require("../db/index");
const S = require("sequelize");

class CartItem extends S.Model{

}

CartItem.init({
    cantidad:{
        type: S.DataTypes.INTEGER,
        defaultValue: 1
    },
    costo:{
        type: S.DataTypes.INTEGER,
        allowNull: false

    },
    talle: {
        type: S.DataTypes.DECIMAL,
        allowNull: true,
    }

},{
    sequelize: db,
    modelName: "cartItem"
})

module.exports = CartItem