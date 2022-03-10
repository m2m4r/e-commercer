const User = require("./User");
const Productos = require("./Productos");
const Inventario = require("./Inventario");
const CartItem = require("./CartItem");
const Interaccion = require("./Interacciones");

Productos.hasOne(CartItem, {
  foreignKey: "product_id",
});

CartItem.belongsTo(Productos);

User.hasMany(CartItem, {
  foreignKey: "user_id_session",
});

CartItem.belongsTo(User);

User.hasOne(Interaccion, {
  foreignKey: "user_id",
});

Productos.hasOne(Interaccion, {
  foreignKey: "product_id",
});

Interaccion.belongsTo(Productos);

Productos.hasMany(Inventario, {foreignKey :"product_id",  onDelete: 'cascade'})





module.exports = { User, CartItem, Interaccion, Productos, Inventario };

