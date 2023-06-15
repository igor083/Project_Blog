const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');//transforma a string e um formato para a url (titulo aleatorio => titulo-aleatorio)

router.get('/admin/categories/new',  (req, res) =>{
    res.render("admin/categories/new");
});
router.post('/categories/save',(req,res)=>{
    var title = req.body.title;
    if(title!= undefined){

        Category.create({
            title:title,
            slug:slugify(title)
        }).then(()=>{
            res.redirect('/admin/categories')
        })

    }else{
        res.redirect('/admin/categories/new');
    }
    
});
router.get("/admin/categories", (req,res)=>{
Category.findAll().then(categories=>{
    res.render("admin/categories/CategoriesIndex",{categories:categories})

})

})

router.post("/categories/delete",(req,res)=>{

    var id = req.body.id;
    if(id!= undefined){
        if(!id.isNaN){
            Category.destroy({
                where:{
                    id:id
                }
            }).then(()=>{res.redirect("/admin/categories")});


        }else{res.redirect("/admin/categories")}
    }else{res.redirect("/admin/categories")}

})

router.get("/admin/categories/edit/:id",(req,res)=>{
    var id = req.params.id;
    if(id.isNaN){res.redirect("/admin/categories")}
    Category.findByPk(id).then(category=>{
        if(category!=undefined){
            res.render("admin/categories/edit",{category:category})
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro=>{
        res.redirect("/admin/categories");
    })
})

router.post("/categories/update",(req,res)=>{
    var id = req.body.id;
    var title = req.body.title;
    var slug = req.body.slug;
    
    Category.update({title:title,slug:slugify(title)},{
        where:{
            id:id,
        }
    }).then(()=>{res.redirect("/admin/categories")})
})

module.exports = router;