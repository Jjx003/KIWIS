var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');

// We are printing the console logs but the tag_ids is undefined

router.post('/CreatePost', function (req, res, next) { 

    console.log("In here");
    console.log("TITLE: "+req.body.title+" CONTENT: "+req.body.content+" IDs: "+req.body.tag_ids);
    var user_id = db.getUserID()

    db.getCompanyName(user_id).then(function(snapshot) {
        var forum_name = snapshot.val();
        // call addPostData() with the user inputs
        db.addPostData(forum_name, user_id, req.body.title, req.body.tag_ids, req.body.content).then(() => {
            console.log("added post data");
            res.jsonp({success: true});
        })
        .catch(() => {
            console.log("error when adding post data");
            res.jsonp({success: false});
        });
    })

});


module.exports = router;