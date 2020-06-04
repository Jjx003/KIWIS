
var express = require("express");
var router = express.Router();
var db = require("../../db/metadata/index")
var auth = require('../../auth/index');
var {authenticated, isAdmin} = require('../auth/index');
require('dotenv').config();


// GET route for getting the amount of posts/responses per user
router.get('/getUserMetadata', 

    authenticated, isAdmin,

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            db.getCompanyName(decodedToken).then(function(snapshot) {
                company_name = snapshot;
                db.getMetadata(company_name).then((data) => {
                    res.jsonp(data['userCount']);
                }).catch( function(error) {
                    console.log(error);
                    res.jsonp({success: false});
                });
            }).catch( function(error) {
                console.log(error);
                res.jsonp({success: false});
            })  
        }).catch((error) => {
            console.log(error);
        });
    }
);

// GET route for getting the amount of posts use a certain tag
router.get('/getTagMetadata', 

    authenticated, isAdmin,

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            db.getCompanyName(decodedToken).then(function(snapshot) {
                company_name = snapshot;
                db.getMetadata(company_name).then((data) => {
                    res.jsonp(data['tagCount']);
                }).catch( function(error) {
                    console.log(error);
                    res.jsonp({success: false});
                });
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