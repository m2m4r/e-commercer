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

class CatPro extends S.Model{


}
CatPro.init({
    cat: {
      type: S.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  },{
    sequelize: db,
    modelName: "catPro"
});




module.exports = {Categoria,CatPro}