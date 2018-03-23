var express = require('express');
var mongoose = require('mongoose');
var ejs = require('ejs');
var router = express.Router();

mongoose.connect("mongodb://127.0.0.1:27017/test", function(err) {
    if (!err) {
        console.log("connected to mongodb")
    } else {
        throw err;
    }
})

var News = new mongoose.Schema({
    title: String,
    author: String,
    source: String,
    ctime: String,
    content: String
});
var NewsModel = mongoose.model("DocNews", News);
var NewsQueryModel = mongoose.model("DocNews")
router.get("/newsadd", function(req, res) {
    res.render("newsadd.ejs");
})
router.post('/newsadd', function(req, res) {
    // res.render('newsadd.ejs')
    var tbtitle = req.body.tbtitle;
    var tbcontent = req.body.tbcontent;
    var tbsource = req.body.tbsource;
    var tbauthor = req.body.tbauthor;

    var instance1 = new NewsModel();
    instance1.title = tbtitle;
    instance1.content = tbcontent;
    instance1.source = tbsource;
    instance1.author = tbauthor;
    instance1.ctime = instance1.ctime = new Date().toLocaleDateString();
    instance1.save(function(err) {
        if (err) {
            console.log("保存失败！");
            return;

        }
        res.redirect("/news/list")
    })
})
router.get("/list", function(req, res) {
    NewsQueryModel.find({}, function(err, docs) {
        res.render('newslist.ejs', { title: '新闻列表', newsdata: docs })
    })
})
router.get("/edit/:id", function(req, res) {
    var id = req.params.id;
    NewsQueryModel.findById(id, function(err, doc) {
        res.render('newsedit.ejs', { title: '新闻编辑', newsdata: doc })
    })
})

router.post("/newsedit", function(req, res) {
    var id = req.body.id;
    var tbtitle = req.body.tbtitle;
    var tbcontent = req.body.tbcontent;
    var tbsource = req.body.tbsource;
    var tbauthor = req.body.tbauthor;
    NewsQueryModel.findById(id, function(err, doc) {
        doc.title = tbtitle;
        doc.author = tbauthor;
        doc.source = tbsource;
        doc.connect = tbcontent;
        doc.save(function(err) {
            if (!err) {
                res.redirect("/news/list");
            } else {
                throw err;
            }
        })
    })
})

router.get("/delete/:id", function(req, res) {
    var id = req.params.id;
    NewsQueryModel.findById(id, function(err, doc) {
        if (!doc) {
            return next(new NotFound("doc not found"))
        } else {
            doc.remove(function() {
                res.redirect("/news/list")
            })
        }
    })
})

router.get("/newsview/:id", function(req, res) {
    var id = req.params.id;
    NewsQueryModel.findById(id, function(err, doc) {
        res.render('newsview.ejs', { title: "新闻详情页面", newsdata: doc })
    })
})
module.exports = router;