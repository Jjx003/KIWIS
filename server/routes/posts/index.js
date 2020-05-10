var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var db = require('../../db/index');

router.post('/CreatePost', function (req, res, next) { 

    console.log("In here");
    console.log(req.body.title+" "+req.body.content+" "+req.body.tag_ids);
    // call addPostData() with the user inputs
    db.addPostData(forumName, p_user_id, req.body.title, req.body.tag_ids, p_date_time, req.body.content).then(() => {
        console.log("added post data");
        res.jsonp({success: true});
    }).catch(() => {
        console.log("error when adding post data");
        res.jsonp({success: false});
    });

});


module.exports = router;