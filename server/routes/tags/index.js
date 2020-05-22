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



//     // Checks for errors when checking http parameters and checks if logged in
//     function (req, res, next) {
//         const errors = validationResult(req);
//         if(!errors.isEmpty()) {
//             return res.status(422).json({errors: errors.array() });
//         }

//         auth.checkToken(req.cookies.auth).then(() =>{
//             next()
//         }).catch( (error)  => {
//             console.log("error occured when checking token, request denied");
//             res.jsonp({success: false});
//         })  
//     },

//     function (req, res, next) {
//         try {
//             db.getTags(req.body.forumName).then((data) => {
//                 res.send(data.val());
//             });
//         } catch (error) {
//             console.log(error);
//             res.jsonp({success: false});
//         }
//     }
// );

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



// GET all tags from the database
router.post('/all',
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

    authenticated, 

    function (req, res, next) {
        try {
            db.getTags(req.body.forumName).then((data)=>{
                res.send(data.val());
            });
        } catch (error) {
            console.log(error)
            res.jsonp({success: false});
        }  
    }
);



module.exports = router;
