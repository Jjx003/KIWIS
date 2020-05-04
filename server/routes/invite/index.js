var express = require("express");
var router = express.Router();
var path = require('path');
var mailgun = require("mailgun-js");
require('dotenv').config();

console.log(process.env.MAILGUN_API_KEY)
const mg = mailgun({
    apiKey:	process.env.MAILGUN_API_KEY, 
	domain: 'mg.kiwis.tech', 
});

function sendEmail(email, subject, content) {
    console.log(email)
	const data = {
		"from": "Excited User <ninja@mg.kiwis.tech>",
		"to": email,
		"subject": subject ? subject : 'Hello',
		"text": content,
    }
	mg.messages().send(data, function(error, body){
        console.log(body);
        console.log(error);
	})
}

router.post('/', function (req, res, next) {
    /*
    uid , 
    nodemailer 
    localhost9000/invite/uid
    */

    // When moving to production, need a authentication cookie passed in as well
    // Or else people can exploit this route.

    console.log(req.body)
    try {
        sendEmail(req.body.email, "test", req.body.content);
    } catch (error) {
        res.send("failed");
        console.log(error)
        return;
    }
    res.send("succ");

  
});

router.get('/accept_invite/:uuid', function(req, res, next) {
  ///yes
  res.redirect('http://localhost:3000/login');
});


module.exports = router;

