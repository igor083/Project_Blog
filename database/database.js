const Sequelize = require("sequelize");

const connection = new Sequelize('projblog','root','Senharoot',{
    host:'localhost',
    dialect: 'mysql'
});
module.exports = connection;