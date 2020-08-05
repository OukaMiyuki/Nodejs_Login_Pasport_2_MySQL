const Sequelize = require('sequelize');
const db = new Sequelize('crud_passport', 'root', '', {
    dialect: 'mysql'
});
db.sync({});
module.exports = db;