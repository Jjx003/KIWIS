var express = require("express");
var router = express.Router();
var db = require("../../db/index")
require('dotenv').config();

// POST method to create suer to the database
router.post('/', function (req, res, next) {

    // When moving to production, need a authentication cookie passed in as well
    // Or else people can exploit this route.
    try {
        db.createNewUser(req.body.forumName, req.body.firstName, req.body.lastName, req.body.email);
    } catch (error) {
        res.send("failed");
        console.log(error)
        return;
    }  
});

// POST method to removes certain user from the database given a UUID
router.post('/remove/:userID', function (req, res, next) {

    // When moving to production, need a authentication cookie passed in as well
    // Or else people can exploit this route.
    try {
        db.removeUser(req.body.forumName, req.params['userID']);
    } catch (error) {
        res.send("failed");
        console.log(error)
        return;
    }  
});

// GET method to get a single user from the database
router.get('/:userID', function (req, res, next) {

    // When moving to production, need a authentication cookie passed in as well
    // Or else people can exploit this route.
    try {
        db.getUser(req.body.forumName, req.params['userID']).then((data)=>{
            res.send(data.val());
        });
    } catch (error) {
        res.send("failed");
        console.log(error)
        return;
    }  
});

// GET method to get all users from the database
router.get('/all', function (req, res, next) {

    // When moving to production, need a authentication cookie passed in as well
    // Or else people can exploit this route.
    try {
        db.getUsers(req.body.forumName).then((data)=>{
            res.send(data.val());
        });
    } catch (error) {
        res.send("failed");
        console.log(error)
        return;
    }  
});



module.exports = router;

