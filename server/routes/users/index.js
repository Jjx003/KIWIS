var express = require("express");
var router = express.Router();
var db = require("../../db/index")
var auth = require('../../auth/index');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

router.get('/company', 
    function (req, res, next) {
        try {
            res.send(req.user.company);
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
        }  
    }
);

router.get('/allUsers', 
    function (req, res, next) {
        try {
            db.getUsers(req.user.company).then((data)=>{
                res.send(data.val());
            });
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
        }  
    }
);

router.post('/singleUser', 
    function (req, res, next) {
        try {
            db.getUser(req.user.company, req.body.userid).then((data)=>{
                res.send(data.val());
            });
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
        }  
    }
);

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
        if(!errors.isEmpty() || !req.user.admin) {
            return res.status(422).json({errors: errors.array() });
        }
        
        next(); 
    }, 
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
        check('forumName').isLength({min: 1}).trim().escape(),
        check('userID').isLength({min: 1})
    ],

    // Checks for errors when checking http parameters and checks if logged in
    function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty() || !req.user.admin) {
            return res.status(422).json({errors: errors.array() });
        }
        next();
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
        check('forumName').isLength({min: 1}).trim().escape()
    ],

    // Checks for errors when checking http parameters and checks if logged in
    function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        }

        next();
    },

    function (req, res, next) {
        try {
            db.getUsers(req.user.company).then((data)=>{
                res.send(data.val());
            });
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
        }  
    }
);



module.exports = router;

