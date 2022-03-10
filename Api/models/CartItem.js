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

    }
},{
    sequelize: db,
    modelName: "CartItem"
})

module.exports = CartItem