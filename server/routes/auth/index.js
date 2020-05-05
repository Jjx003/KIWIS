var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');

// attempts to login in user
router.post('/login', function (req, res, next) { 
    auth.login(req.body.email, req.body.password).then(() => { 
        // retrieve their userid here

        let test_uid = "hi";
        // creating token for user, passing in userid. Token expires after an hour
        auth.createToken(test_uid).then((token) => {
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
            res.jsonp({success: "user"});
        }).catch( function(error) {
            console.log("error occured when checking token, request denied");
            res.jsonp({success: ''});
        })  
    } catch(error) {
        console.log("222222, request denied");
        console.log(error)
        res.jsonp({success: ''});
    }

});
module.exports = router;