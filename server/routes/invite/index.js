var express = require("express");
//var bcrypt = require("bcrypt");
var crypto = require('crypto');
var router = express.Router();
var path = require('path');
var mailgun = require("mailgun-js");
var db = require("../../db/index");
var auth = require('../../auth/index');
var {authenticated, isAdmin} = require('../auth/index')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const mg = mailgun({
    apiKey:	process.env.MAILGUN_API_KEY, 
	domain: 'mg2.kiwis.tech', 
});

function sendEmail(email, subject, content) {
	const data = {
		"from": "Excited User <ninja@mg2.kiwis.tech>",
		"to": email,
		"subject": subject ? subject : 'Hello',
		"text": content,
    }
	mg.messages().send(data);
}

router.get('/accept_invite/:uuid', (req, res, next) => {
    let uuid = req.params.uuid;
  // checking if uuid is present in registration table
  db.checkRegistration(req.params.uuid).then((snapshot) => {
      //console.log(snapshot)
      if (snapshot.val() != null) { res.redirect("https://kiwi-test-app.herokuapp.com/signup/" + req.params.uuid); }
  }).catch((error) => {
      console.log(error);
      res.jsonp({success:false});
  }).catch((error) => {
    console.log(error)
  })

});

router.post('/', 
authenticated, isAdmin, 

function (req, res, next) {
    try {
        // TODO: Sanitize email?
        let email = req.body.email;
        let company = req.user.company;
        crypto.randomBytes(16, (err, hash) => {
            hash = hash.toString('hex')
            let inviteLink = `https://kiwi-test-app.herokuapp.com/inviteUser/accept_invite/${hash}`;
            db.createRegistration(hash, company, email).then(() => {
                let content = "Welcome to KIWI!\n" + "You have invited to the " + company + " KIWI forum!" + "\n" + "Please click the link below to get started." + "\n" + inviteLink  + "\n";
                sendEmail(email, "KIWI Forums", content);
                res.jsonp({success: true}); 
            })
        })


    } catch (error) {
        res.send("failed");
        console.log(error)
        return;
    }  
});

router.post('/validateID', (req, res) => {
    db.checkRegistration(req.body.uuid).then((snapshot) => {
        let value = snapshot.val();
        if (value != null || value != undefined) {
            res.jsonp({success:true});
        } else {
            res.jsonp({success:false});
        }
    }).catch((error) => {
        console.log(error);
        res.jsonp({success:false});
    }) 
})



module.exports = router;

