var express = require("express");
//var bcrypt = require("bcrypt");
var crypto = require('crypto');
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

router.get('/accept_invite/:uuid', (req, res, next) => {
    let uuid = req.params.uuid;
  // checking if uuid is present in registration table
<<<<<<< HEAD
  db.checkRegistration(req.params.uuid).then((id) => {
      if (id != null) { res.redirect("http://localhost:3000/signup/" + req.params.uuid); }
=======
  db.checkRegistration(req.params.uuid).then((snapshot) => {
      if (snapshot.val() != null) { res.redirect("http://localhost:3000/signup/" + req.params.uuid); }
>>>>>>> 3d05912a639a20133c629b2981057dad1783b6f7
  }).catch((error) => {
      console.log(error);
      res.jsonp({success:false});
  }).catch((error) => {
    console.log(error)
  })
<<<<<<< HEAD

});

=======

});

>>>>>>> 3d05912a639a20133c629b2981057dad1783b6f7
router.post('/', function (req, res, next) {
    try {
        // TODO: Sanitize email?
        let email = req.body.email;
        let company = req.user.company;
        crypto.randomBytes(16, (err, hash) => {
            let inviteLink = `http://localhost:3000/inviteUser/accept_invite/${hash}`;
            db.createRegistration(hash, company, email).then(() => {
                hash = hash.toString('hex')
                let content = "Welcome!\n" + req.body.content + "\n" + inviteLink  + "\n";
                sendEmail(email, "test", content);
                res.jsonp({success: true}); 
            })
        })


    } catch (error) {
        res.send("failed");
        console.log(error)
        return;
    }  
});

/*
try {
    // TODO: Sanitize email?
    let company = "UXD14";
    let email = "j"
    crypto.randomBytes(16, (err, hash) => {
        hash = hash.toString('hex')
        let inviteLink = `http://localhost:3000/inviteUser/accept_invite/${hash}`;
        db.createRegistration(hash, company, email).then(() => {
            let content = "Welcome!\n" + "\n" + inviteLink  + "\n";
            sendEmail(email, "test", content);
            res.jsonp({success: true}); 
        })
    })
} catch (error) {

    console.log(error)
    return;
}
*/

router.post('/validateID', (req, res) => {
<<<<<<< HEAD
    db.checkRegistration(req.body.uuid).then((id) => {
        if (id != null || id != undefined) {
=======
    db.checkRegistration(req.body.uuid).then((snapshot) => {
        let value = snapshot.val();
        if (value != null || value != undefined) {
>>>>>>> 3d05912a639a20133c629b2981057dad1783b6f7
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

