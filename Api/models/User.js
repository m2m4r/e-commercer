const db = require("../db/index");
const S = require("sequelize");
const bcrypt = require('bcrypt')

class User extends S.Model{
    setHash(password, salt){
        return bcrypt.hash(password, salt)
    }
}
User.init({
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
    documento:{
        type:S.DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: true
        }
    },
    usuario:{
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
    },
    telefono:{
        type:S.DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty:true
        }
    },
    direccion:{
        type:S.DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty:true
        }
    },
    permiso:{
        type: S.DataTypes.STRING,
        defaultValue: "user"
    }


},{
    sequelize: db,
    modelName: "user"
})

User.addHook('beforeCreate',(user)=>{
    return bcrypt.genSalt(16)
    .then(salt => {
        user.salt = salt
        return user.setHash(user.contraseña, user.salt)
    })
    .then(hashedPassword => user.contraseña = hashedPassword)
})

User.addHook('beforeUpdate',(user)=>{
    console.log('ENTRE---------------')
    return bcrypt.genSalt(16)
    .then(salt => {
        user.salt = salt
        return user.setHash(user.contraseña, user.salt)
    })
    .then(hashedPassword => user.contraseña = hashedPassword)
})


module.exports = User