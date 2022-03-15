const db = require("../db/index");
const S = require("sequelize");

class Categoria extends S.Model{

}

Categoria.init({
    cat:{
        type:S.DataTypes.STRING,
        

    },

},{
    sequelize: db,
    modelName: "categorias"
});


module.exports = Categoria;