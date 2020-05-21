var express = require("express");
var auth = require('../../auth/index')
var router = express.Router();
var {getCompanyTags} = require('../../db/index')

router.get('/',
    function (req, res, next) {
        const company = 'UXD14';        //needs to get company so not hard coded
        let tags = [];
        getCompanyTags(company, tags).then(
            () => res.jsonp({success : true, tags: tags})
        );
    }
);

module.exports = router;
