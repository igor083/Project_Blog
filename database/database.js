const Sequelize = require("sequelize");

const connection = new Sequelize('projblog','root','Senharoot',{
    host:'localhost',
    dialect: 'mysql',
    timezone:"-03:00"
});

module.exports = connection;