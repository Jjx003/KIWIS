var express = require("express");
var bcrypt = require("bcrypt");
var authRouter = express.Router();
var auth = require('../../auth/index'); //  TODO: WTF
var dbIndex = require('../../db/index')

const saltRounds = 10;

// checks if the user is authenticated
const authenticated = (req,res,next) => {
	try {
   		auth.checkToken(req.cookies.auth).then((decodedToken) => {
			dbIndex.getCurrentUserID(req.cookies.auth).then((user_id) => {
				dbIndex.getCompanyName(user_id).then((company_name) => {
					req.user = {id:user_id, company: company_name, admin: decodedToken.email_verified}
					next();
				})
			});
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
/*
authRouter.post('/signUp', function (req, res) {
	db.checkRegistration(req.params.uuid).then((snapshot) => {
		if (snapshot.val()) {
			let company = snapshot.val().company_name;
			let email = req.body.email;
			let uuid = req.body.uuid;
			
			bcrypt.hash(email, salt).then((hash) => {
				if (hash == uuid) {
					auth.signUp(email, req.body.password).then(() => {
						console.log("sign up successful.");
						res.jsonp({success: true});
					}).catch(() => {
						console.log("error when signing up");
						res.jsonp({success: false});
					});
				} else {
					res.jsonp({success: true}); 
				}
			})
		}
	})

});
*/

authRouter.post('/AdminSignUp', function (req, res) {
	dbIndex.createNewUser("N/A", req.body.company, req.body.first_name, req.body.last_name, 
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

authRouter.post('/EmployeeSignUp', function (req, res) {
	// checkRegistration returns the company's name
	dbIndex.checkRegistration(req.body.registration_ID).then((snapshot) => {
		console.log(req.body);

		let value = snapshot.val();
		if (value && value.expected_company && value.expected_email) {
			let company = value.expected_comapny;
			let expectedEmail = value.expected_email;
			let email = req.body.email;
			if (email == expectedEmail) {
				console.log("email match")
				dbIndex.createNewUser(req.body.registration_ID, company, req.body.first_name, req.body.last_name,
					req.body.email, req.body.password, false).then((result) => {
						console.log("step6")
						console.log("sign up successful.");
						if (result == true) {
							res.jsonp({ success: true });
						} else {
							res.jsonp({ success: false });
						}
					}).catch((error) => {
						res.jsonp({ success: false });
					})
			} else {
				res.jsonp({ success: false });
			}
		} else {
			res.jsonp({ success: false });
		}

    }).catch((error) => {
		console.log("error when registering user");
		console.log(error);
		res.jsonp({success: false});
	});
});


authRouter.get('/checkIfSignedIn', authenticated, function(req, res, next) {
	// user is signed in 
	res.jsonp({success: true});
});


module.exports = {authRouter, authenticated, isAdmin};
