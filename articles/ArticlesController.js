const express = require('express');
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render("admin/articles/ArticlesIndex", { articles: articles });
    });
});

router.get('/admin/articles/new', function (req, res) {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories });

    })
})

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles");
    });
});
router.post("/articles/delete", (req, res) => {

    var id = req.body.id;
    if (id != undefined) {
        if (!id.isNaN) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => { res.redirect("/admin/articles") });


        } else { res.redirect("/admin/articles") }
    } else { res.redirect("/admin/articles") }

})
router.get("/admin/articles/edit/:id", (req, res) => {
   var id = req.params.id;

   if (isNaN(id)) {
       res.redirect("/admin/articles");
   } else {
       Article.findByPk(id, {
           include: [{ model: Category }]
       }).then(article => {
           if (article !== null) {
               res.render("admin/articles/edit", { article: article });
           } else {
               res.redirect("/admin/articles");
           }
       }).catch(error => {
           res.redirect("/admin/articles");
       });
   }
});


router.post("/articles/update",(req,res)=>{
   var id = req.body.id;
   var title = req.body.title;
   var slug = req.body.slug;
   var body = req.body.body;
   Article.update({title:title,slug:slugify(title),body:body},{
       where:{
           id:id,
       }
   }).then(()=>{res.redirect("/:slug")})
})

module.exports = router;