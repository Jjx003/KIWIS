var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');

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
	 		console.log(error);
        res.jsonp({success: false});
    }

});
module.exports = router;
