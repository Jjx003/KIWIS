var express = require("express");
var router = express.Router();
var db = require('../../db/index');

// attempts to login in user
router.post('/login', function (req, res, next) { 
    db.login(req.body.email, req.body.password).then(() => {
        console.log("login successful.");
        res.jsonp({success:true});
    }).catch(() => {
        console.log("invalid credentials");
        res.jsonp({success: false});
    });
});

// attempts to sign out user
router.get('/signOut', function (req, res, next) {
    db.signOut().then(() => {
        console.log("sign out successful.");
        res.jsonp({success: true});
    }).catch(() => {
        console.log("sign out failed.");
        res.jsonp({success:false});
    });
});

// attempts to sign up user
router.post('/signUp', function (req, res, next) {
    db.signUp(req.body.email, req.body.password).then(() => {
        console.log("sign up successful.");
        res.jsonp({success: true});
    }).catch(() => {
        console.log("error when signing up");
        res.jsonp({success: false});
    });
});

module.exports = router;