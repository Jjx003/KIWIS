var express = require("express");
var router = express.Router();
router.post('/', function (req, res, next) {
    /*
    uid , 
    nodemailer 
    localhost9000/invite/uid
    */
});

router.post('/accept_invite/:uuid', function(req, res, next) {
    /*
    check the db if valid uid
        redirect to sign up page

        // mark uid as invalid at the end of the sign up method
        // leave confirmation of email to firebase code 
    */
});

