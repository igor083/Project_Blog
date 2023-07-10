const express = require('express');
const router = express.Router();


router.get('/admin/articles/new', function (req, res) {
    res.render("admin/articles/new");
})


module.exports = router;