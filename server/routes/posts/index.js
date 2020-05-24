var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');
var {authenticated} = require('../auth/index');

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

router.get('/UserMadePost',

function (req, res) {
    console.log("Entered UserMadePost");

    //var response_id = "-M7AyPI9Ydzq_3OvBUhu"
    var user_id = "Rz5mBuIvkDNSwdzK3B2W8H6seQ32"
    var post_id = "-M7AwUea2paJyqoqSW4e"
    //var user_id = "123"
    db.getCompanyName(user_id).then(function(snapshot) {
        var company_name = "UXD14";

        var userMadePost = db.userMadePost(company_name, user_id, post_id);

        if(userMadePost == true) {
            res.jsonp({success : true});
        } else {
            res.jsonp({success : false});
        }

    })
});

router.post('/UserMadePost',

function (req, res) {
    db.getCurrentUserID(req.cookies.auth).then((user_id) => {
        db.getCompanyName(user_id).then(function(company_name) {
            var userMadePost = db.userMadePost(company_name, user_id, post_id);

            if(userMadePost == true) {
                res.jsonp({success : pushedData});
            } else {
                res.jsonp({success : false});
            }

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