var express = require("express");
var router = express.Router();
var db = require("../../db/index")
var auth = require('../../auth/index');
var {authenticated, isAdmin} = require('../auth/index');
const { check, validationResult } = require('express-validator');
require('dotenv').config();



router.get('/getTags', 

    authenticated,

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                company_name = snapshot;
                db.getTags(company_name).then((data) => {
                    if(data.val() != null) {
                        res.send({success: true, tags: data.val()});
                    }
                    else {
                        res.send({success: true, tags: {}});
                    }
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



// POST method to removes certain tag from the database and from the users of the company
router.post('/remove', 
    [
        check('tagName').isLength({min: 1}).trim().escape()
    ],

    authenticated, isAdmin, 
     
    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                db.removeTag(company_name, req.body.tagName);
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


// POST method to add a single tag
router.post('/add', 
    [
        check('tagName').isLength({min: 1}).trim().escape()
    ],

    authenticated, isAdmin, 

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                db.createNewTag(company_name, req.body.tagName);
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


module.exports = router;