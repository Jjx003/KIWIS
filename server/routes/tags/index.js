var express = require("express");
var auth = require('../../auth/index')
var router = express.Router();
var {db} = require('../../firebase')

router.get('/',
    function (req, res, next) {
        const company = 'UXD14';        //call get company
        db.database().ref(company+'/Tags').once('value').then(function(snapshot) {
            var tags = snapshot.val();
            res.jsonp({success : true, tags: tags});
        })

    }
);

module.exports = router;
