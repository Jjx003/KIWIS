var express = require("express");
var router = express.Router();
var db = require("../../db/index")
var auth = require('../../auth/index');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

// POST method to create user to the database
router.post('/add', 
    [
        body('forumName').isLength({min: 1}).trim().escape(),
        body('firstName').isLength({min: 1}).trim().escape(),
        body('lastName').isLength({min: 1}).trim().escape(),
        body('email').isEmail().isLength({min: 1}.normalizeEmail())
    ],


    // Checks for errors when checking http parameters and checks if logged in
    function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        }

        auth.checkToken(req.cookies.auth).then(() =>{
            next()
        }).catch( (error) => {
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
        }  
    }
);

// POST method to remove certain user from the database given a UUID
router.post('/remove', 
    [
        body('forumName').isLength({min: 1}).trim().escape(),
        body('userID').isLength({min: 1})
    ],

    // Checks for errors when checking http parameters and checks if logged in
    function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        }

        auth.checkToken(req.cookies.auth).then(() =>{
            next()
        }).catch( (error)  => {
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
        }
    }
);

// GET method to get a single user from the database
router.get('/', 
    [
        body('forumName').isLength({min: 1}).trim().escape(),
        body('userID').isLength({min: 1})
    ],


    // Checks for errors when checking http parameters and checks if logged in
    function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        }

        auth.checkToken(req.cookies.auth).then(() =>{
            next()
        }).catch( (error)  => {
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
        }  
    }
);

// GET method to get all users from the database
router.get('/all', 
    [
        body('forumName').isLength({min: 1}).trim().escape()
    ],

    // Checks for errors when checking http parameters and checks if logged in
    function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        }

        auth.checkToken(req.cookies.auth).then(() =>{
            next()
        }).catch( (error) => {
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
        }  
    }
);



module.exports = router;

