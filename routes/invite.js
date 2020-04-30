var express = require("express");
var router = express.Router();
var path = require('path');

router.post('/', function (req, res, next) {
    /*
    uid , 
    nodemailer 
    localhost9000/invite/uid
    */
   
});

router.get('/accept_invite/:uuid', function(req, res, next) {
    /*
    check the db if valid uid
        redirect to sign up page
        res.redirect(localhost:3000/user);
        // mark uid as invalid at the end of the sign up method
        // leave confirmation of email to firebase code 
    */
  res.redirect('/signup');
});

module.exports = router;

