const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

//carregando o view engine para renderizar o html na pasta views
app.set('view engine', 'ejs');

//usando os arquivos estaticos
app.use(express.static("public"));

//configurando o body parser para trabalhar com formularios
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conectando o banco de dados
connection.authenticate()
    .then(() => {
        console.log("Conexao feita");
    }).catch((error) => {
        console.log(error);
    })


//rotas

app.use("/", categoriesController);//usando as rotas que estao dentro do arquivo categories controller
app.use("/", articlesController);//usando as rotas que estao dentro do arquivo articles controller

app.get("/", (req, res) => {
    res.render('index');
});

app.listen(8080, () => {
    console.log("Servidor rodando");
})