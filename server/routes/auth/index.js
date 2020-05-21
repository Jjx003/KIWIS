var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');

// checks if the user is authenticated
const authenticated = (req,res,next) => {
	try {
		console.log(req.cookies.auth);
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
router.post('/AdminSignUp', function (req, res) {
	db.createNewUser("1", req.body.company, req.body.first_name, req.body.last_name, 
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
	db.checkRegistration(req.body.registration_ID).then((result) => {
		var company = result.val();
	
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


module.exports = {router, authenticated, isAdmin};
