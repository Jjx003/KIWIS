var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');
var firebase = require('../../firebase');


// We are printing the console logs but the tag_ids is undefined




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

function (req, res) {
    db.getCurrentUserID(req.cookies.auth).then((user_id) => {
        db.getCompanyName(user_id).then(function(company) {
            db.pushResponse(company, user_id, req.body.post_id, req.body.content);
            res.jsonp({success : true});
        }).catch(function(error){
            console.log(error);
            res.jsonp({success: false});
        })
    }).catch(function(error){
        console.log(error);
        res.jsonp({success: false});
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

function (req, res) {
    db.getCurrentUserID(req.cookies.auth).then((user_id) => {
    db.getCompanyName(user_id).then(function(company) {
        db.pullResponse(company, req.body.post_id).then(
            res.jsonp({success : true})
        );
        }).catch(function(error){
            console.log(error);
            res.jsonp({success: false});
        })
    }).catch(function(error){
        console.log(error);
        res.jsonp({success: false});
    })
});

router.post('/upvote', 
function (req, res, next) {
    auth.checkToken(req.cookies.auth).then(() =>{
        next()
    }).catch( function(error) {
        console.log("error occured when checking token, request denied");
        res.jsonp({success: false});
    })  
}, 
function (req, res) {
    db.getCurrentUserID(req.cookies.auth).then((user_id) => {
    db.getCompanyName(user_id).then(function(company) {
        db.upVoteResponse(company, req.body.response_id).then(
            res.jsonp({success : true})
        );
        }).catch(function(error){
            console.log(error);
            res.jsonp({success: false});
        })
    }).catch(function(error){
        console.log(error);
        res.jsonp({success: false});
    })
});

router.post('/endorse', 
function (req, res, next) {
    auth.checkToken(req.cookies.auth).then(() =>{
        next()
    }).catch( function(error) {
        console.log("error occured when checking token, request denied");
        res.jsonp({success: false});
    })  
}, 
function (req, res) {
    db.getCurrentUserID(req.cookies.auth).then((user_id) => {
    db.getCompanyName(user_id).then(function(company) {
        db.endorseResponse(company, req.body.response_id).then(
            res.jsonp({success : true})
        );
        }).catch(function(error){
            console.log(error);
            res.jsonp({success: false});
        })
    }).catch(function(error){
        console.log(error);
        res.jsonp({success: false});
    })
});

module.exports = router;