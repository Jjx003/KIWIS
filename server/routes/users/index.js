var express = require("express");
var router = express.Router();
var db = require("../../db/index")
var auth = require('../../auth/index');
require('dotenv').config();

// POST method to create suer to the database
router.post('/add', 

    // Checks for authorized access
    function (req, res, next) {
        auth.checkToken(req.cookies.auth).then(() =>{
            next()
        }).catch( function(error) {
            console.log("error occured when checking token, request denied");
            res.jsonp({success: false});
        })  
    },

    function (req, res, next) {
        try {
            db.createNewUser(req.body.forumName, req.body.firstName, req.body.lastName, req.body.email);
            res.jsonp({success: true});
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
            return;
        }  
    }
);

// POST method to removes certain user from the database given a UUID
router.post('/remove', 

    // Checks for authorized access
    function (req, res, next) {
        auth.checkToken(req.cookies.auth).then(() =>{
            next()
        }).catch( function(error) {
            console.log("error occured when checking token, request denied");
            res.jsonp({success: false});
        })  
    },

    function (req, res, next) {
        try {
            db.removeUser(req.body.forumName, req.body.userID);
            res.jsonp({success: true});
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
            return;
        }
    }
);

// GET method to get a single user from the database
router.get('/', 

    // Checks for authorized access
    function (req, res, next) {
        auth.checkToken(req.cookies.auth).then(() =>{
            next()
        }).catch( function(error) {
            console.log("error occured when checking token, request denied");
            res.jsonp({success: false});
        })  
    },

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
            return;
        }  
    }
);

// GET method to get all users from the database
router.get('/all', 

    // Checks for authorized access
    function (req, res, next) {
        auth.checkToken(req.cookies.auth).then(() =>{
            next()
        }).catch( function(error) {
            console.log("error occured when checking token, request denied");
            res.jsonp({success: false});
        })  
    },

    function (req, res, next) {
        try {
            db.getUsers(req.body.forumName).then((data)=>{
                res.send(data.val());
            });
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
            return;
        }  
    }
);



module.exports = router;

