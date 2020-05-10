var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');

// attempts to login in user
router.post('/login', function (req, res, next) { 
    auth.login(req.body.email, req.body.password).then(() => { 
        // retrieve their userid here

        var user_id = db.getUserID();
        
        
        // creating token for user, passing in userid. Token expires after an hour
        auth.createToken(user_id).then((token) => {
            res.jsonp({token: token, success: true})
        });
    }).catch((error) => {
        console.log(error);
        console.log("invalid credentials");
        res.jsonp({success: false});
    });
});

// attempts to sign out user
router.get('/signOut', function (req, res, next) {
    auth.signOut().then(() => {
        console.log("sign out successful.");
        res.jsonp({success: true});
    }).catch(() => {
        console.log("sign out failed.");
        res.jsonp({success:false});
    });
});

// attempts to sign up user
router.post('/signUp', function (req, res, next) {
    auth.signUp(req.body.email, req.body.password).then(() => {
        console.log("sign up successful.");
        res.jsonp({success: true});
    }).catch(() => {
        console.log("error when signing up");
        res.jsonp({success: false});
    });
});

router.get('/checkIfSignedIn', function(req, res, next) {
    try {
        auth.checkToken(req.cookies.auth).then(() =>{
            res.jsonp({success: true});
        }).catch( function(error) {
            console.log("error occured when checking token, request denied");
            res.jsonp({success: false});
        })  
    } catch(error) {
        res.jsonp({success: false});
    }

});
module.exports = router;