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


module.exports = router;