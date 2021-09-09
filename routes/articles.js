const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
    res.render("pages/new", {article: new Article() })
})

router.get("/edit/:id", async (req, res) =>{
    const article = await Article.findById(req.params.id)
    res.render("pages/edit", {article: article})
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put("/:id", async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect("edit"))

router.delete("/:id", async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

// router.put("/:id", async (req, res, next) => {
//     req.article = await Article.findById(req.params.id)
//     next()
// }, saveArticleAndRedirect("show"))

function saveArticleAndRedirect(path){
    return async (req, res) => {
        let article = req.article
        article.amount = req.body.amount
        article.place = req.body.place
        article.category = req.body.category
        try {
            article = await article.save()
            res.redirect("/")
        } catch (e) {
            res.render(`pages/${path}`, { article: article })
            console.log(e);
        }
    }
}

module.exports = router;