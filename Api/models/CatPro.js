const db = require("../db/index");
const S = require("sequelize");

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

module.exports = CatPro;