var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
var path = require('path');
var mailgun = require("mailgun-js");
var db = require("../../db/index");
require('dotenv').config();

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const mg = mailgun({
    apiKey:	process.env.MAILGUN_API_KEY, 
	domain: 'mg.kiwis.tech', 
});

function sendEmail(email, subject, content) {
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
        // TODO: Sanitize email?

        let email = req.body.email;
        bcrypt.hash(email, salt).then((hash) => {
            let inviteLink = `http://localhost:3000/inviteUser/accept_invite/${hash}`
            let content = "Welcome!/n" + req.body.content + "/n" + inviteLink  + "/n";
            sendEmail(email, "test", content);
        })
    } catch (error) {
        res.send("failed");
        console.log(error)
        return;
    }
    res.send("succ");

  
});

router.get('/accept_invite/:uuid', function(req, res, next) {
  // checking if uuid is present in registration table
  db.checkRegistration(req.params.uuid).then((snapshot) => {
      if (snapshot.val() != null) { res.redirect("http://localhost:3000/signup/" + req.params.uuid); }
      res.send("Invalid Registration ID");
  }).catch((error) => {
      console.log(error);
  })
});

router.post('/validateID', function(req, res) {
    db.checkRegistration(req.body.uuid).then((snapshot) => {
        if (snapshot.val() != null) {
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

