var express = require("express");
var authRouter = express.Router();
var auth = require('../../auth/index'); //  TODO: WTF
var dbIndex = require('../../db/index')

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
			console.log("Request Denied: User is not authenticated.");
        	res.jsonp({success: false});
	}
};

// checks if the user is an admin
const isAdmin = (req, res, next) => {
	try {
		auth.checkToken(req.cookies.auth).then((decodedToken) => {
			if (decodedToken.email_verified) { next();
			} else {
				console.log("Request Denied: User is not an admin."); 
				res.jsonp({success: false});
			}

		}).catch((error) =>{
			console.log(error);
		});
	
	} catch (error) {
		console.log(error);
		res.jsonp({success: false});
	}
};

authRouter.post('/AdminSignUp', function (req, res) {
	dbIndex.createNewUser("N/A", req.body.company, req.body.first_name, req.body.last_name, 
		req.body.email, req.body.password, true).then((result) => {
			res.jsonp({success: result});
    }).catch((error) => {
		console.log(error);
        res.jsonp({success: false});
    });
});

authRouter.post('/EmployeeSignUp', function (req, res) {
	// checkRegistration returns the company's name
	dbIndex.checkRegistration(req.body.registration_ID).then((snapshot) => {
		let value = snapshot.val();
		if (value && value.expected_company && value.expected_email) {
			let company = value.expected_company;
			let expectedEmail = value.expected_email;
			let email = req.body.email;
			if (email == expectedEmail) {
				dbIndex.createNewUser(req.body.registration_ID, company, req.body.first_name, req.body.last_name,
					req.body.email, req.body.password, false).then((result) => {
						res.jsonp({ success: result });
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
		console.log(error);
		res.jsonp({success: false});
	});
});


authRouter.get('/checkIfSignedIn', authenticated, function(req, res, next) {
	// user is signed in 
	res.jsonp({success: true});
});

// reset password function
authRouter.post('/resetPassword', 

	authenticated,

	function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
			auth.updateUserPassword(decodedToken, req.body.newPassword).then(function() {
				// Update successful.
				res.jsonp({success: true});
			}).catch((error) => {
				// error when resetting password
				console.log(error);
				res.jsonp({success: false});
			});
		});
});
module.exports = {authRouter, authenticated, isAdmin};
