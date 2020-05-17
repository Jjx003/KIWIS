var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');

const authenticated = (req,res,next) => {
	try {
		console.log(JSON.parse(req.cookies.auth).token);
		console.log(typeof(JSON.parse(req.cookies.auth).token))
   		auth.checkToken(JSON.parse(req.cookies.auth).token).then(() =>{
			console.log("in here");
			next();
      	}).catch( function(error) {
			console.log(error);
         	res.jsonp({success: false});
      })  
    } catch(error) {
	 		console.log(error);
			console.log("Inside authenticated.");
        	res.jsonp({success: false});
    }
};

const isAdmin = (req, res, next) => {
	if (JSON.parse(req.cookies.auth).admin) { next();}
	console.log("Request Denied: User is not an admin.");
	res.jsonp({success: false});
};

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

router.get('/checkIfSignedIn', authenticated, function(req, res, next) {
	res.jsonp({success: true});
});


module.exports = {router, authenticated, isAdmin};
