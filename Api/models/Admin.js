const db = require("../db/index");
const S = require("sequelize");
const bcrypt = require('bcrypt')

class Admin extends S.Model{
    setHash(password, salt){
        return bcrypt.hash(password, salt)
    }
}


Admin.init({
    nombre:{
        type:S.DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    apellido:{
        type:S.DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    role:{
        type:S.DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    email:{
        type:S.DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    contraseña:{
        type:S.DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    salt:{
        type: S.DataTypes.STRING
    }
},{
    sequelize: db,
    modelName: "admin"
})

Admin.addHook('beforeCreate',(admin)=>{
    return bcrypt.genSalt(16)
    .then(salt => {
        admin.salt = salt
        return admin.setHash(admin.contraseña, admin.salt)
    })
    .then(hashedPassword => admin.contraseña = hashedPassword)
})

module.exports = Admin