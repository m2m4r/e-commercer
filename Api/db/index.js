const { options, database } = require("../db/config.json");
const Sequelize = require("sequelize");


const db = new Sequelize(database, null, null, options);


module.exports = db