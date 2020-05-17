var express = require("express");
var router = express.Router();
var db = require("../../db/index")
var auth = require('../../auth/index');
const { check, validationResult } = require('express-validator');
require('dotenv').config();



router.post('/userTags',
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

        auth.checkToken(req.cookies.auth).then(() =>{
            next()
        }).catch( (error)  => {
            console.log("error occured when checking token, request denied");
            res.jsonp({success: false});
        })  
    },

    function (req, res, next) {
        try {
            db.getUserTags(req.body.forumName, req.body.userID).then((data) => {
                res.send(data.val());
            });
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
        }
    }
);




router.post('/removeSpecialization', 
    [
        check('forumName').isLength({min: 1}).trim().escape(),
        check('userID').isLength({min: 1}).trim().escape()
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
            db.removeSpecialization(req.body.forumName, req.body.userID);
            res.jsonp({success: true});
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
        }  
    }
);


module.exports = router;