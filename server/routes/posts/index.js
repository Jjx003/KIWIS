var express = require("express");
var auth = require('../../auth/index')
var router = express.Router();
var {db} = require('../../firebase')
//var {getCompanyPosts, getCompanyTags} = require('../db')


router.get('/:id', function (req, res, next) {
    auth.checkToken(req.cookies.auth).then(() =>{
        next()
    }).catch( function(error) {
        console.log("error occured when checking token, request denied");
        res.jsonp({success: false});
    })  
},
function (req, res, next) {
    const company = 'UXD14';        //call get company
    db.database().ref(company+'/Posts/'+req.params.id).once('value').then(function(snapshot) {
        var posts = snapshot.val();
        //db.getCompanyPosts(company);
        res.jsonp(posts);
    })

}
);


router.post('/', function (req, res, next) {
    
        auth.checkToken(req.cookies.auth).then(() =>{ 
            next()
        }).catch( function(error) {
            console.log("error occured when checking token, request denied");
            res.jsonp({success: false});
        })  
    },
    function (req, res, next) {
        console.log('response')
        const company = 'UXD14';        //call get company
        db.database().ref(company+'/Posts').once('value').then(function(snapshot) {
            var posts = snapshot.val();
            console.log(posts);
            //db.getCompanyPosts(company);
            res.jsonp({success : true});
        })
    
    }
);

module.exports = router;