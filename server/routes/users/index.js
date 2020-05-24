var express = require("express");
var router = express.Router();
var db = require("../../db/index")
var {authenticated, isAdmin} = require('../auth/index');
var auth = require('../../auth/index');
const { check, validationResult } = require('express-validator');
require('dotenv').config();


router.post('/removeAllUserTags',

    authenticated,

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                console.log("\n\n\n " + company_name)
                var removed = db.removeAllUserTags(company_name, user_id);
                res.jsonp({success: removed});
            }).catch( function(error) {
                console.log(error);
                res.jsonp({success: false});
            })  
        }).catch((error) => {
            console.log(error);
            console.log()
        });
    }
);



router.post('/userTags',

    authenticated,

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                db.getUserTags(company_name, user_id).then((data) => {
                    res.send(data.val());
                });
            }).catch( function(error) {
                console.log(error);
                res.jsonp({success: false});
            })  
        }).catch((error) => {
            console.log(error);
            console.log()
        });
    }
);

router.post('/removeSpecialization', 

    authenticated,

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                var removed = db.removeSpecialization(company_name, user_id, req.body.tag);
                res.jsonp({success : removed});
            }).catch( function(error) {
                console.log(error);
                res.jsonp({success: false});
            })  
        }).catch((error) => {
            console.log(error);
            console.log()
        });
    }
);



router.post('/addSpecialization', 

    authenticated,

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                var added = db.addSpecialization(company_name, user_id, req.body.tag);
                res.jsonp({success : added});
            }).catch( function(error) {
                console.log(error);
                res.jsonp({success: false});
            })  
        }).catch((error) => {
            console.log(error);
            console.log()
        });
    }
);

// POST method to create user to the database
router.post('/add', 
    [
        check('forumName').isLength({min: 1}).trim().escape(),
        check('firstName').isLength({min: 1}).trim().escape(),
        check('lastName').isLength({min: 1}).trim().escape(),
        check('email').isEmail().isLength({min: 1}).normalizeEmail(),
        check('password').isLength({min: 6}).trim().escape()
    ],


    // Checks for errors when checking http parameters and checks if logged in
    function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        }
        
        next(); 
    }, 

    authenticated, isAdmin, 

    function (req, res, next) {
        try {
            db.createNewUser(req.body.forumName, req.body.firstName, req.body.lastName, req.body.email, req.body.password);
            res.jsonp({success: true});
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
        }  
    }
);

// POST method to remove certain user from the database given a UUID
router.post('/remove', 
    [
        check('userID').isLength({min: 1})
    ],

    authenticated, isAdmin,

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                db.removeUser(company_name, req.body.userID);
                res.jsonp({success : true});
            }).catch( function(error) {
                console.log(error);
                res.jsonp({success: false});
            })  
        }).catch((error) => {
            console.log(error);
            console.log()
        });
    }
);

// GET method to get a single user from the database
router.get('/', 
    [
        check('forumName').isLength({min: 1}).trim().escape(),
        check('userID').isLength({min: 1})
    ],


    // Checks for errors when checking http parameters and checks if logged in
    function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        }
        next();
    },
    
    authenticated,  

    function (req, res, next) {
        // When moving to production, need a authentication cookie passed in as well
        // Or else people can exploit this route.
        try {
            db.getUser(req.body.forumName, req.body.userID).then((data)=>{
                res.send(data.val());
            });
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
        }  
    }
);

// GET method to get all users from the database
router.post('/all', 

    authenticated,

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                db.getUsers(company_name).then((data)=>{
                    res.send(data.val());
                });
            }).catch( function(error) {
                console.log(error);
                res.jsonp({success: false});
            })  
        }).catch((error) => {
            console.log(error);
            console.log()
        });
    }
);

router.post('/toggleAdmin', 
    [
        check('userID').isLength({min: 1})
    ],

    authenticated, 
    
    isAdmin,
    

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                db.toggleAdmin(company_name, req.body.userID);
                res.jsonp({success : true});
            }).catch( function(error) {
                console.log(error);
                res.jsonp({success: false});
            })  
        }).catch((error) => {
            console.log(error);
            console.log()
        });
    }
);

router.post('/getUserEmail', 
    
    authenticated,
        
    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                db.getUserEmail(company_name, user_id).then(function(snapshot) {
                    res.jsonp({success : true, userEmail: snapshot.val()});
                })
            }).catch( function(error) {
                console.log(error);
                res.jsonp({success: false});
            })  
        }).catch((error) => {
            console.log(error);
            console.log()
        });
    }
);

router.post('/isUserAdmin', 

    authenticated,
    
    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                db.isUserAdmin(company_name, user_id).then(function(snapshot) {
                    res.jsonp({success : true, admin: snapshot.val()});
                })
            }).catch( function(error) {
                console.log(error);
                res.jsonp({success: false});
            })  
        }).catch((error) => {
            console.log(error);
            console.log()
        });
    }
);



module.exports = router;