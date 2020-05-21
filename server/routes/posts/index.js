var express = require("express");
var auth = require('../../auth/index')
var router = express.Router();
var {db} = require('../../firebase')
var {getCompanyPosts} = require('../../db/index')


router.get('/:id', function (req, res, next) {
    auth.checkToken(req.cookies.auth).then(() =>{
        next()
    }).catch( function(error) {
        console.log("error occured when checking token, request denied");
        res.jsonp({success: false});
    })  
},
function (req, res, next) {
    const company = 'UXD14';        //call get company, this should not be hard coded
    db.database().ref(company+'/Posts/'+req.params.id).once('value').then(function(snapshot) {
        var posts = snapshot.val();
        res.jsonp(posts);
    })

}
);

//check auth with this get request
router.get('/',
    function (req, res, next) {
        const company = 'UXD14';        //call get company
        let posts = [];
        getCompanyPosts(company, posts);
        res.jsonp({success : true, posts: posts});
    }
);

module.exports = router;