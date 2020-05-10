var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');

// We are printing the console logs but the tag_ids is undefined



router.post('/CreatePost',

function (req, res, next) {
    auth.checkToken(req.cookies.auth).then(() =>{
        next()
    }).catch( function(error) {
        console.log("error occured when checking token, request denied");
        res.jsonp({success: false});
    })  
},

function (req, res, next) {
    var user_id = db.getUserID();
    db.getCompanyName(user_id).then(function(snapshot) {
        var forum_name = snapshot.val();
        // call addPostData() with the user inputs
        var pushedData = db.addPostData(forum_name, user_id, req.body.title, req.body.tag_ids, req.body.content);
        res.jsonp({success : pushedData});
    })
});


module.exports = router;