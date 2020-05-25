var express = require("express");
var router = express.Router();
var {db} = require('../../firebase')
var {authenticated} = require('../auth/index');
var dbIndex = require('../../db/index')

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

                db.userMadePost(company, user_id, req.params.id).then(function(result) {
                
                    res.jsonp({posts: posts, responses: responseData, createdPost: result})
                    
                }).catch( function(error) {
                    console.log(error);
                    res.jsonp({success: false});
                })

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
router.get('/', (req, res, next) => {
        const company = req.user.company; 
        dbIndex.getCompanyPosts(company).then((posts) =>
        res.jsonp({success : true, posts: posts}));
    }
);

router.post('/CreatePost', (req, res, next) => {
    var company_name = req.user.company;
    var user_id = req.user.id;
    console.log(company_name, user_id);
    var pushedData = dbIndex.addPostData(company_name, user_id, req.body.title, req.body.tag_ids, req.body.content);
    res.jsonp({success : pushedData});
    }
)

module.exports = router;