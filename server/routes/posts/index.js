var express = require("express");
var router = express.Router();
var {db} = require('../../firebase')
var {authenticated} = require('../auth/index');
var dbIndex = require('../../db/index')

router.get('/:id', (req, res, next) => {
    db.database().ref(req.user.company + '/Posts/' + req.params.id).once('value').then((snapshot) => {
        var posts = snapshot.val();
        res.jsonp(posts);
    }).catch((error) => {
        console.log(error)
    })
});

//check auth with this get request
router.get('/', (req, res, next) => {
        const company = req.user.company; 
        dbIndex.getCompanyPosts(company).then((posts) =>
        res.jsonp({success : true, posts: posts}));
    }
);

router.post('/CreatePost', (req, res, next) => {
    var company_name = req.user.company;
    var user_id = req.user.id;
    console.log(company_name, user_id);
    var pushedData = dbIndex.addPostData(company_name, user_id, req.body.title, req.body.tag_ids, req.body.content);
    res.jsonp({success : pushedData});
    }
)

module.exports = router;