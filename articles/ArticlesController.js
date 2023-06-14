const express = require('express');
const router = express.Router();


router.get('/admin/articles/new', function (req, res) {
    res.send("Rota para criar um articles");
})

module.exports = router;