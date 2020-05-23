var express = require("express");
var router = express.Router();
var {db} = require('../../firebase')
var {authenticated} = require('../auth/index');
var {getCompanyPosts} = require('../../db/index')


router.get('/:id', authenticated,

function (req, res, next) {
    const company = 'UXD14'; // call get company, this should not be hard coded
    // need make a database function for this
    db.database().ref(company+'/Posts/'+req.params.id).once('value').then(function(snapshot) {
        var posts = snapshot.val();
        res.jsonp(posts);
    })
});

//check auth with this get request
router.get('/',
    function (req, res, next) {
        const company = 'UXD14';        // TODO: call get company
        let posts = [];
        getCompanyPosts(company, posts);
        res.jsonp({success : true, posts: posts});
    }
);

router.post('/CreatePost',

authenticated,

function (req, res) {
    db.getCurrentUserID(req.cookies.auth).then((user_id) => {
        db.getCompanyName(user_id).then(function(company_name) {
            var pushedData = db.addPostData(company_name, user_id, req.body.title, req.body.tag_ids, req.body.content);
            res.jsonp({success : pushedData});
        }).catch( function(error) {
            console.log(error);
            res.jsonp({success: false});
        })  
    }).catch((error) => {
        console.log(error);
        console.log()
    });
});


module.exports = router;