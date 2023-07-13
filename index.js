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
   Article.findAll({
      order: [['id', 'DESC']]
   }).then(articles => {
      Category.findAll().then(categories => {

         res.render('index', { articles: articles, categories: categories });
      })

   })
})

app.get("/:slug", (req, res) => {
   var slug = req.params.slug;
   Article.findOne({
      where: {
         slug: slug
      }
   }).then(article => {
      if (article != undefined) {
         Category.findAll().then(categories => {

            res.render('article', { article: article, categories: categories });
         })
      } else res.redirect("/");

   }).catch(erro => {
      res.redirect("/");
   })


})

app.get("/category/:slug", (req, res) => {

   var slug = req.params.slug;
   Category.findOne({
      where: {
         slug: slug
      },
      include: [{ model: Article }]
   }).then(category => {
      if (category != undefined) {
         Category.findAll().then(categories=>{
            res.render("index",{articles:category.articles,categories:categories})
         })
      } else {
         res.redirect("/");
      }
   
}).catch(err => {
   res.redirect("/")
})
})
app.listen(8080, () => {
   console.log("Servidor rodando");
})