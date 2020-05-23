var express = require("express");
var router = express.Router();
var dbIndex = require("../../db/index")
var auth = require('../../auth/index');
var {authenticated, isAdmin} = require('../auth/index');
var {db} = require('../../firebase')
const { check, validationResult } = require('express-validator');
// POST method to removes certain tag from the database and from the users of the company
router.post('/remove', 
    [
        check('forumName').isLength({min: 1}).trim().escape(),
        check('tagName').isLength({min: 1}).trim().escape()
    ],


    // Checks for errors when checking http parameters and checks if logged in
    function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        }

	 	  next();
    },

	 authenticated, isAdmin, 

    // Removes the tag from company and users
    function (req, res, next) {

        try {
            dbIndex.removeTag(req.body.forumName, req.body.tagName);
            res.jsonp({success: true});
        } catch (error) {
            console.log(error);
            res.jsonp({success: false});
        }  
    }
);

// POST method to add a single tag
router.post('/add', 
    [
        check('forumName').isLength({min: 1}).trim().escape(),
        check('tagName').isLength({min: 1}).trim().escape()
    ],


    // Checks for errors when checking http parameters and checks if logged in
    function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        }
        
        next();
    },

    authenticated, isAdmin, 

    function (req, res, next) {
        try {
            dbIndex.createNewTag(req.body.forumName, req.body.tagName);
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
            dbIndex.getTags(req.body.forumName).then((data)=>{
                res.send(data.val());
            });
        } catch (error) {
            console.log(error)
            res.jsonp({success: false});
        }  
    }
);

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
