const User = require("./User");
const Productos = require("./Productos");
const Inventario = require("./Inventario");
const CartItem = require("./CartItem");
const Interaccion = require("./Interacciones");

Productos.hasOne(CartItem);

CartItem.belongsTo(Productos);

User.hasMany(CartItem);

CartItem.belongsTo(User);

User.hasOne(Interaccion);

Productos.hasOne(Interaccion);

Interaccion.belongsTo(Productos);

Productos.hasMany(Inventario, {foreignKey :"product_id",  onDelete: 'cascade'})





module.exports = { User, CartItem, Interaccion, Productos, Inventario };

