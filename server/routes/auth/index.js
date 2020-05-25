var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');
const { check } = require('express-validator');

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
			
			else{
				console.log("Request Denied: User is not an admin.");
				res.jsonp({success: false});
			}
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
router.post('/AdminSignUp', function (req, res) {

	db.createNewUser("N/A", req.body.company, req.body.first_name, req.body.last_name, 
					req.body.email, req.body.password, true).then((result) => {
		
		if(result == true) {
			console.log("sign up successful.");
			res.jsonp({success: true});
		} else {
			console.log("sign up UNsuccessful.");
			res.jsonp({success: false});
		}
    }).catch((error) => {
		console.log("error when signing up");
		console.log(error);
        res.jsonp({success: false});
    });
});

router.post('/EmployeeSignUp', function (req, res) {


	// checkRegistration returns the company's name
	db.checkRegistration(req.body.registration_ID).then((company) => {
		db.createNewUser(req.body.registration_ID, company, req.body.first_name, req.body.last_name, 
						req.body.email, req.body.password, false).then((result) => {
			console.log("sign up successful.");
			if(result == true) {
				res.jsonp({success: true});
			} else {
				res.jsonp({success: false});
			}
    	}).catch((error) => {
			console.log("error when creating new user");
			console.log(error);
			res.jsonp({success: false});
		});
    }).catch((error) => {
		console.log("error when registering user");
		console.log(error);
		res.jsonp({success: false});
	});
});

router.get('/checkIfSignedIn', authenticated, function(req, res, next) {
	// user is signed in 
	res.jsonp({success: true});
});

// reset password function
router.post('/resetPassword', 
	[
		check('newPassword').isLength({min: 1}).trim().escape()
	],

	authenticated,

	function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {

			auth.updateUserPassword(decodedToken, req.body.newPassword).then(function() {
				// Update successful.
				res.jsonp({success: true});
			}).catch((error) => {
				console.log("error when resetting password");
				console.log(error);
				res.jsonp({success: false});
			});
		});
});

module.exports = {router, authenticated, isAdmin};
