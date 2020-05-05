var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');

// attempts to login in user
router.post('/login', function (req, res, next) { 
    auth.login(req.body.email, req.body.password).then(() => { 
        // creating token for user, expires after an hour
        auth.createToken().then((token) => {
            res.send({token: token, success: true})
        });
    }).catch((error) => {
        console.log(error);
        res.send({success: false});
    });
});

// attempts to sign out user
router.get('/signOut', function (req, res, next) {
    auth.signOut().then(() => {
        // delete their token 
        console.log("Sign out successful.");
        res.send({success: true});
    }).catch((error) => {
        console.log(error);
        res.send({success:false});
    });
});

// attempts to sign up user
router.post('/signUp', function (req, res) {
    auth.signUp(req.body.email, req.body.password).then(() => {
        // send email confirmation here


        // generate token for new user
        auth.createToken().then((token) => {
            res.send({token: token, success: true})
        });
    }).catch((error) => {
        console.log(error);
        res.jsonp({success: false});
    });
});

router.get('/checkIfSignedIn', function(req, res, next) {
    try {
        auth.checkToken(req.cookies.auth).then(() =>{
            res.send({success: "user"});
        }).catch( function(error) {
            console.log(error);
            res.send({success: ''});
        })  
    } catch(error) {
        console.log(error);
        res.send({success: ''});
    }
});

module.exports = router;