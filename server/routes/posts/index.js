var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var {authenticated} = require('../auth/index');
var db = require('../../db/index');

router.get('/DeletePostData', 

function (req, res) {

    console.log("Entered deletePost");
    var company_name = "UXD14";
    var post_id = "-M7Kbmak49nsNSGaVVFG";
    // Change db back to whatever
    var deletedData = db.deletePostData(company_name, post_id);
    res.jsonp({success : deletedData});

});

router.get('/DeleteResponseData', 

function (req, res) {

    console.log("Entered deleteResponse");
    var company_name = "UXD14";
    var response_id = "-M7B2Q0YWBFSSRaIiAew";
    // Change db back to whatever
    var deletedData = db.deleteResponseData(company_name, response_id);
    res.jsonp({success : deletedData});

});

module.exports = router;