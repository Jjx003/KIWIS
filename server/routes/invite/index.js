var express = require("express");
var router = express.Router();
var path = require('path');
var mailgun = require("mailgun-js");
var db = require("../../db/index");
require('dotenv').config();

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
  // checking if uuid is present in registration table
  db.checkRegistration(req.params.uuid).then((company) => {
      console.log(company);
      if (company != null) { res.redirect("http://localhost:3000/signup/" + req.params.uuid); }
      res.send("Invalid Registration ID");
  }).catch((error) => {
      console.log(error);
  })
});

router.post('/validateID', function(req, res) {
    db.checkRegistration(req.body.uuid).then((company) => {
        if (company != null) {
            res.jsonp({success: true}); 
        } else{
            res.jsonp({success: false});
        }
    }).catch((error) => {
        console.log(error);
        res.jsonp({success:false});
    }) 
})


module.exports = router;

