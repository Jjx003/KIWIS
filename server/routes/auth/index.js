var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');

// checks if the user is authenticated
const authenticated = (req,res,next) => {
	try {
   		auth.checkToken(req.cookies.auth).then(() =>{
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

// checks if the user is an admin
const isAdmin = (req, res, next) => {
	try {
		auth.checkToken(req.cookies.auth).then((decodedToken) => {
			if (decodedToken.email_verified) { next(); }
			console.log("Request Denied: User is not an admin."); 
			res.jsonp({success: false});
		}).catch((error) =>{
			console.log(error);
		});
	
	} catch (error) {
		console.log(error);
		console.log("Inside isAdmin.");
		res.jsonp({success: false});
	}
};

// only signs up to firebase, doesn't follow the actual sign up process of our app. 
router.post('/signUp', function (req, res) {
    auth.signUp(req.body.email, req.body.password).then(() => {
        console.log("sign up successful.");
        res.jsonp({success: true});
    }).catch(() => {
        console.log("error when signing up");
        res.jsonp({success: false});
    });
});

router.get('/checkIfSignedIn', authenticated, function(req, res, next) {
	// user is signed in 
	res.jsonp({success: true});
});


module.exports = {router, authenticated, isAdmin};
