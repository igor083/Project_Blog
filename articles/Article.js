const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require("../categories/Category.js");


const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
//definindo relacionamentos no sequelize
Category.hasMany(Article);//uma categoria tem muitos artigos       1-*
Article.belongsTo(Category);//um artigo pertece a uma categoria     1-1


module.exports = Article;