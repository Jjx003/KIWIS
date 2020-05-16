var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');

const authenticated = (req,res,next) => {
	try {
   	auth.checkToken(req.cookies.auth.token).then(() =>{
			next();
      }).catch( function(error) {
      	console.log("Request Denied: User is not signed in");
         res.jsonp({success: false});
      })  
    } catch(error) {
	 		console.log(error);
			console.log("Inside authenticated.");
        	res.jsonp({success: false});
    }
};


const isAdmin = (req, res, next) => {
	if (req.cookies.auth.isAdmin) { next();}
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

router.get('/checkIfSignedIn', function(req, res, next) {
	console.log(req.cookies.auth) 
	console.log("inasdfasdfasdf");
	res.jsonp({success: true});
});


module.exports = {router, authenticated, isAdmin};
