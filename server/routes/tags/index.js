var express = require("express");
var router = express.Router();
var db = require("../../db/index")
var auth = require('../../auth/index');
var {authenticated, isAdmin} = require('../auth/index')
const { check, validationResult } = require('express-validator');
require('dotenv').config();
var {getCompanyTags} = require('../../db/index')
<<<<<<< HEAD

=======
>>>>>>> 3d05912a639a20133c629b2981057dad1783b6f7
router.get('/',
    function (req, res, next) {
        const company = req.user.company;        //needs to get company so not hard coded
        let tags = [];
        getCompanyTags(company, tags).then(
            () => res.jsonp({success : true, tags: tags})
        );
    }
);

router.get('/getTags',
    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                company_name = snapshot;
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

    isAdmin, 
     
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

    isAdmin, 

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
        });
    }
);


module.exports = router;
