const db = require("../db/index");
const S = require("sequelize");


class DetalleCompra extends S.Model{

}

DetalleCompra.init({
    precio_final:{
        type: S.DataTypes.INTEGER,
        allowNull: false
    },
    productos_comprados:{
        type: S.DataTypes.ARRAY(S.DataTypes.JSON),
        allowNull: false
    },
    estado_compra:{
        type: S.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pendiente"
    },
    forma_entrega:{
        type: S.DataTypes.STRING,
        allowNull:false
    },
    medio_de_pago:{
        type: S.DataTypes.JSON,
        allowNull:false
    },
    datos_contacto:{
        type: S.DataTypes.JSON,
        allowNull: false
    }

},{
    sequelize: db,
    modelName: "detalleCompra"
})


module.exports = DetalleCompra