const db = require("../db/index");
const S = require("sequelize");

class Interaccion extends S.Model{

}

Interaccion.init({
    rating:{
        type: S.DataTypes.INTEGER,
        allowNull: true
    },
    comentario:{
        type: S.DataTypes.TEXT,
        allowNull: true
    }
},{
    sequelize: db,
    modelName: "interaccion"
})


module.exports = Interaccion