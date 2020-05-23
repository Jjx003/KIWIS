var express = require("express");
var router = express.Router();
var db = require("../../db/index")
var auth = require('../../auth/index');
var {authenticated, isAdmin} = require('../auth/index');
const { check, validationResult } = require('express-validator');
require('dotenv').config();



router.post('/getTags', 

    authenticated,

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken.uid;
            db.getCompanyName(decodedToken.uid).then(function(snapshot) {
                var company_name = snapshot.val();
                db.getTags(company_name).then((data) => {
                    res.send({success: true, tags: data.val()});
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
            var user_id = decodedToken.uid;
            db.getCompanyName(decodedToken.uid).then(function(snapshot) {
                var company_name = snapshot.val();
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
            var user_id = decodedToken.uid;
            db.getCompanyName(decodedToken.uid).then(function(snapshot) {
                var company_name = snapshot.val();
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



// use ours get tags that gets company specicic values
router.get('/',
    function (req, res, next) {
        const company = 'UXD14';        //call get company
        db.database().ref(company+'/Tags').once('value').then(function(snapshot) {
            var tags = snapshot.val();
            res.jsonp({success : true, tags: tags});
        })

    }
);

module.exports = router;
