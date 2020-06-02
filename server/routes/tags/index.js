var express = require("express");
var router = express.Router();
var db = require("../../db/index")
var auth = require('../../auth/index');
var {authenticated, isAdmin} = require('../auth/index')
const { check, validationResult } = require('express-validator');
var {getCompanyTags} = require('../../db/index')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

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
                res.jsonp({success : true});
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
