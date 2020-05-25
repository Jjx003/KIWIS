var express = require("express");
var auth = require('../../auth/index')
var router = express.Router();
var {db} = require('../../firebase')
var {getCompanyPosts, getCompanyTags, pullResponse, getCurrentUserID,
        getCompanyName} = require('../../db/index')


router.get('/:id', function (req, res, next) {
    auth.checkToken(req.cookies.auth).then(() =>{
        next()
    }).catch( function(error) {
        console.log("error occured when checking token, request denied");
        res.jsonp({success: false});
    })  
},
function (req, res) {
    getCurrentUserID(req.cookies.auth).then((user_id) => {
        getCompanyName(user_id).then(function(company) {
            var posts;
            db.database().ref(company+'/Posts/'+req.params.id).once('value').then(function(snapshot) {
                posts = snapshot.val();
               
           }).catch(function(error){
            console.log(error);
            res.jsonp({success: false});
        })
            pullResponse(company, req.params.id).then( (responseData) =>{
                res.jsonp({posts: posts, responses: responseData})
            }).catch(function(error){
                console.log(error);
                res.jsonp({success: false});
            })
        }).catch(function(error){
            console.log(error);
            res.jsonp({success: false});
        })
    })        
    
    
    
});

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