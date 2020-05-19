var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var {authenticated} = require('../auth/index');
var db = require('../../db/index');

router.get('/UpvoteResponse',

function (req, res) {
    //var user_id = db.getUserID();
    console.log("Entered route");
    var user_id = "zmeQUPa7Dqg282ycBUkuxnGjHgE22"
    db.getCompanyName(user_id).then(function(snapshot) {
        //var company_name = snapshot.val();
        var company_name = "UXD14";
        db.updateKarma(company_name, user_id, "-M7AyPI9Ydzq_3OvBUhu").then(function(result) {
            if(result == true) {
                res.jsonp({success: true});
            } else {
                res.jsonp({success: false});
            }
        }
        ).catch( function(error) {
            console.log(error);
            res.jsonp({success: false});
        })
    }).catch( function(error) {
        console.log(error);
        res.jsonp({success: false});
    })  
});


module.exports = router;