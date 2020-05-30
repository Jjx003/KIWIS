var express = require("express");
var router = express.Router();
var {db} = require('../../firebase')
var {authenticated} = require('../auth/index');
var dbIndex = require('../../db/index')

router.get('/:id', 
    function (req, res) {
        let user_id = req.user.id;
        let company = req.user.company;
        var posts;
        db.database().ref(company + '/Posts/' + req.params.id).once('value').then((snapshot) => { 
            posts = snapshot.val();
        }).catch((error) => {
            console.log(error);
            res.jsonp({ success: false });
        })

        dbIndex.pullResponse(company, req.params.id).then((responseData) => {
            

            dbIndex.userMadePost(company, user_id, req.params.id).then((result) => {

                dbIndex.getUpvoteArray(responseData, user_id).then((array) => {
                    res.jsonp({ posts: posts, responses: responseData, createdPost: result, responseBools: array })
                
                })

            }).catch((error) => {
                console.log(error);
                res.jsonp({ success: false });
            })

        }).catch((error) =>{
            console.log(error);
            res.jsonp({ success: false });
        })


    });

router.get('/', (req, res, next) => {
        const company = req.user.company; 
        dbIndex.getCompanyPosts(company).then((posts) =>
        res.jsonp({success : true, posts: posts}));
    }
);

router.post('/CreatePost', (req, res, next) => {
    var company_name = req.user.company;
    var user_id = req.user.id;
    var pushedData = dbIndex.addPostData(company_name, user_id, req.body.title, req.body.tag_ids, req.body.content);
    res.jsonp({success : pushedData});
    }
)

router.post('/follow',

authenticated,

function (req, res) {
    dbIndex.getCurrentUserID(req.cookies.auth).then((user_id) => {
        dbIndex.getCompanyName(user_id).then(function(company) {
        dbIndex.addFollowingUser(company, req.body.post_id, user_id)
        res.jsonp({success : true})
        }).catch(function(error){
            console.log(error);
            res.jsonp({success: false});
        })
    }).catch(function(error){
        console.log(error);
        res.jsonp({success: false});
    })
});

router.post('/unfollow',

authenticated,

function (req, res) {
    dbIndex.getCurrentUserID(req.cookies.auth).then((user_id) => {
        dbIndex.getCompanyName(user_id).then(function(company) {
        dbIndex.removeFollowingUser(company, req.body.post_id, user_id)
        res.jsonp({success : true})
        }).catch(function(error){
            console.log(error);
            res.jsonp({success: false});
        })
    }).catch(function(error){
        console.log(error);
        res.jsonp({success: false});
    })
});

router.post('/isFollowing',

authenticated,

function (req, res) {
    dbIndex.getCurrentUserID(req.cookies.auth).then((user_id) => {
        dbIndex.getCompanyName(user_id).then(function(company) {
        dbIndex.isFollowingUser(company, req.body.post_id, user_id).then((response) => {
            var isFollowing = (response.val() === user_id)
            res.jsonp({isFollowing: isFollowing, success : true})
        }).catch(function(error){
            console.log(error);
            res.jsonp({success: false});
        })})
        
    }).catch(function(error){
        console.log(error);
        res.jsonp({success: false});
    })
});


router.post('/DeletePostData', (req, res) => {
    var company_name = req.user.company;
    // Not sure if this should be params or body
    var post_id = req.body.post_id;
    console.log(company_name, post_id);
    var deletedData = dbIndex.deletePostData(company_name, post_id);
    res.jsonp({success : deletedData});
    
})

module.exports = router;