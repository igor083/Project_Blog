const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress','root','Senharoot',{
    host:'localhost',
    dialect: 'mysql'
});
module.exports = connection;