var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');
var firebase = require('../../firebase');


// We are printing the console logs but the tag_ids is undefined




router.post('/AddResponse',

// Got this from jeff auth
function (req, res, next) {
    auth.checkToken(req.cookies.auth).then(() =>{
        next()
    }).catch( function(error) {
        console.log("error occured when checking token, request denied");
        res.jsonp({success: false});
    })  
},

function (req, res) {
    db.getCurrentUserID(req.cookies.auth).then((user_id) => {
        db.getCompanyName(user_id).then(function(company) {
            db.pushResponse(company, user_id, req.body.post_id, req.body.content);
            res.jsonp({success : true});
        }).catch(function(error){
            console.log(error);
            res.jsonp({success: false});
        })
    }).catch(function(error){
        console.log(error);
        res.jsonp({success: false});
    })
    

});

router.post('/pullResponse',

function (req, res, next) {
    auth.checkToken(req.cookies.auth).then(() =>{
        next()
    }).catch( function(error) {
        console.log("error occured when checking token, request denied");
        res.jsonp({success: false});
    })  
},

function (req, res) {
    db.getCurrentUserID(req.cookies.auth).then((user_id) => {
    db.getCompanyName(user_id).then(function(company) {
        db.pullResponse(company, req.body.post_id).then(
            res.jsonp({success : true})
        );
        }).catch(function(error){
            console.log(error);
            res.jsonp({success: false});
        })
    }).catch(function(error){
        console.log(error);
        res.jsonp({success: false});
    })
});

router.get('/DeleteResponseData', 

function (req, res) {

    console.log("Entered deleteResponse");
    var company_name = "UXD14";
    var response_id = "-M7Uo9jexiJ-X8BY79U-";
    // Change db back to whatever
    var deletedData = db.deleteResponseData(company_name, response_id);
    res.jsonp({success : deletedData});

});

router.get('/UpvoteResponse',

function (req, res) {
    //var user_id = db.getUserID();
    console.log("Entered route");
    var user_id = "zmeQUPa7Dqg282ycBUkuxnGjHgE22"
    //var user_id = "Rz5mBuIvkDNSwdzK3B2W8H6seQ32"
    db.getCompanyName(user_id).then(function(snapshot) {
        //var company_name = snapshot.val();
        var company_name = "UXD14";
        db.updateKarma(company_name, user_id, "-M7B3VARsTGG-Hu1thYu").then(function(result) {
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


router.get('/UndoUpvote',

function (req, res) {
    //var user_id = db.getUserID();
    console.log("Entered route");
    var user_id = "zmeQUPa7Dqg282ycBUkuxnGjHgE22"
    //var user_id = "Rz5mBuIvkDNSwdzK3B2W8H6seQ32"
    db.getCompanyName(user_id).then(function(snapshot) {
        //var company_name = snapshot.val();
        var company_name = "UXD14";
        db.undoUpvote(company_name, user_id, "-M7B3VARsTGG-Hu1thYu").then(function(result) {
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

router.get('/EndorseResponse',

function (req, res) {
    console.log("Entered EndorseResponse");

    var response_id = "-M7B3VARsTGG-Hu1thYu"
    var user_id = "Rz5mBuIvkDNSwdzK3B2W8H6seQ32"
    //var user_id = "123"
    db.getCompanyName(user_id).then(function(snapshot) {
        var company_name = "UXD14";

        db.endorseResponse(company_name, user_id, response_id).then(function(result) {
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