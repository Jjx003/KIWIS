var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');

// We are printing the console logs but the tag_ids is undefined
//hi



router.post('/AddResponse',

// Got this from jeff auth
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
        var company = snapshot.val();
        db.pushResponse(company, user_id, req.body.post_id, req.body.content);
        res.jsonp({success : true});
    })

});

router.post('/pullResponse',

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
        var company = snapshot.val();
        db.pullResponse(company, req.body.post_id);
        res.jsonp({success : true});
    })

});


module.exports = router;