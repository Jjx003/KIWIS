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
<<<<<<< HEAD
        db.database().ref(company + '/Posts/' + req.params.id).once('value').then((snapshot) => { 
=======
        db.database().ref(company + '/Posts/' + req.params.id).once('value').then((snapshot) => {
>>>>>>> 3d05912a639a20133c629b2981057dad1783b6f7
            posts = snapshot.val();
        }).catch((error) => {
            console.log(error);
            res.jsonp({ success: false });
        })

        dbIndex.pullResponse(company, req.params.id).then((responseData) => {

            dbIndex.userMadePost(company, user_id, req.params.id).then((result) => {
                res.jsonp({ posts: posts, responses: responseData, createdPost: result })

            }).catch((error) => {
                console.log(error);
                res.jsonp({ success: false });
            })
<<<<<<< HEAD

        }).catch((error) =>{
            console.log(error);
            res.jsonp({ success: false });
        })


    });

=======

        }).catch((error) =>{
            console.log(error);
            res.jsonp({ success: false });
        })


    });

//check auth with this get request
>>>>>>> 3d05912a639a20133c629b2981057dad1783b6f7
router.get('/', (req, res, next) => {
        const company = req.user.company; 
        dbIndex.getCompanyPosts(company).then((posts) =>
        res.jsonp({success : true, posts: posts}));
    }
);

router.post('/CreatePost', (req, res, next) => {
    var company_name = req.user.company;
    var user_id = req.user.id;
<<<<<<< HEAD
=======
    console.log(company_name, user_id);
>>>>>>> 3d05912a639a20133c629b2981057dad1783b6f7
    var pushedData = dbIndex.addPostData(company_name, user_id, req.body.title, req.body.tag_ids, req.body.content);
    res.jsonp({success : pushedData});
    }
)

module.exports = router;