var express = require("express");
var router = express.Router();
var db = require("../../db/index")
require('dotenv').config();


router.post('/remove/:tagName', function (req, res, next) {

    // When moving to production, need a authentication cookie passed in as well
    // Or else people can exploit this route.
    try {
        db.removeTag(req.body.forumName, req.params['tagName'])
    } catch (error) {
        res.send("failed");
        console.log(error)
        return;
    }  
});


router.post('/add', function (req, res, next) {

    // When moving to production, need a authentication cookie passed in as well
    // Or else people can exploit this route.
    try {
        db.createNewTag(req.body.forumName, req.body.tagName);
    } catch (error) {
        res.send("failed");
        console.log(error)
        return;
    }  
});

router.get('/', function (req, res, next) {

    // When moving to production, need a authentication cookie passed in as well
    // Or else people can exploit this route.
    try {
        db.getTags(req.body.forumName).then((data)=>{
            res.send(data.val());
        });
    } catch (error) {
        res.send("failed");
        console.log(error)
        return;
    }  
});



module.exports = router;

