const User = require("./User");
const Productos = require("./Productos");
const Inventario = require("./Inventario");
const CartItem = require("./CartItem");
const Interaccion = require("./Interacciones");
const {Categoria, CatPro} = require("./Categoria")



Productos.hasOne(CartItem);

CartItem.belongsTo(Productos);

User.belongsToMany(Productos, { through : Interaccion })
Productos.belongsToMany(User, { through : Interaccion })
User.hasMany(CartItem);
CartItem.belongsTo(User);
Productos.hasMany(Inventario, {foreignKey :"product_id",  onDelete: 'cascade'})


Categoria.belongsToMany(Productos, {through: CatPro, onDelete: 'cascade'})
Productos.belongsToMany(Categoria, {through: CatPro, onDelete: 'cascade' ,onUpdate: 'cascade'})





module.exports = { User, CartItem, Interaccion, Productos, Inventario, Categoria, CatPro };

