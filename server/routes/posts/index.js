var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var {authenticated} = require('../auth/index');
var db = require('../../db/index');

router.get('/UserMadePost',

function (req, res) {

    var user_id = "Rz5mBuIvkDNSwdzK3B2W8H6seQ32"
    //var user_id = "123"
    var post_id = "-M7AwUea2paJyqoqSW4e"
    //var post_id = "-M7Kaie-9Gh51a9mhcTX"
    db.getCompanyName(user_id).then(function(snapshot) {
        var company_name = "UXD14";

        db.userMadePost(company_name, user_id, post_id).then(function(result) {
            if(result == true) {
                console.log("This user made the post");
                res.jsonp({success: true});
            } else {
                console.log("This user did not make the post.");
                res.jsonp({success: false});
            }
        }).catch( function(error) {
            console.log(error);
            res.jsonp({success: false});
        })

    }).catch( function(error) {
        console.log(error);
        res.jsonp({success: false});
    })  
});

router.get('/DeletePostData', 

function (req, res) {

    console.log("Entered deletePost");
    var company_name = "UXD14";
    var post_id = "-M87FFdLm50teYStxDHb";
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