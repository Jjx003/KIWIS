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
                console.log(posts);
                res.jsonp({ posts: posts, responses: responseData, createdPost: result })

            }).catch((error) => {
                console.log(error);
                res.jsonp({ success: false });
            })

        }).catch((error) =>{
            console.log(error);
            res.jsonp({ success: false });
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

/*

router.get('/DeletePostData', 

function (req, res) {

    console.log("Entered deletePost");
    var company_name = "UXD14";
    var post_id = "-M7Kaie-9Gh51a9mhcTX";
    // Change db back to whatever
    var deletedData = dbIndex.deletePostData(company_name, post_id);
    res.jsonp({success : deletedData});

});

*/

module.exports = router;