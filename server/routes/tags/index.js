var express = require("express");
var router = express.Router();
var db = require("../../db/index")
var auth = require('../../auth/index');
require('dotenv').config();


// POST method to removes certain tag from the database and from the users of the company
router.post('/remove', 

    // Checks for authorized access
    function (req, res, next) {
        auth.checkToken(req.cookies.auth).then(() =>{
            next()
        }).catch( (error) => {
            console.log("error occured when checking token, request denied");
            res.jsonp({success: false});
        })  
    },

    // Removes the tag from company and users
    function (req, res, next) {

        try {
            db.removeTag(req.body.forumName, req.body.tagName);
            db.removeTagFromAllUsers(req.body.forumName, req.body.tagName);
            res.jsonp({success: true});
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
        }  
    }
);

// POST method to add a single tag
router.post('/add', 

    function (req, res, next) {
        auth.checkToken(req.cookies.auth).then(() =>{
            next()
        }).catch( (error)=> {
            console.log("error occured when checking token, request denied");
            res.jsonp({success: false});
        })  
    },

    function (req, res, next) {
        try {
            db.createNewTag(req.body.forumName, req.body.tagName);
            res.jsonp({success: true});
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
        }  
    }
);

// GET all tags from the database
router.get('/all', 
    [
    check('forumName').escape()

    ],

    function (req, res, next) {
        auth.checkToken(req.cookies.auth).then(() =>{
            next()
        }).catch( (error) =>{
            console.log("error occured when checking token, request denied");
            res.jsonp({success: false});
        })  
    },

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

