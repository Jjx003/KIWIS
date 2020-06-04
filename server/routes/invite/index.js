var express = require("express");
//var bcrypt = require("bcrypt");
var crypto = require('crypto');
var router = express.Router();
var db = require("../../db/invite/index");
var {authenticated, isAdmin} = require('../auth/index')

router.get('/accept_invite/:uuid', (req, res) => {
  // checking if uuid is present in registration table
  db.checkRegistration(req.params.uuid).then((snapshot) => {
      //console.log(snapshot)
      if (snapshot.val() != null) { res.redirect("http://localhost:3000/signup/" + req.params.uuid); }
  }).catch((error) => {
      console.log(error);
      res.jsonp({success:false});
  }).catch((error) => {
    console.log(error)
  })

});

router.post('/', 
authenticated, isAdmin, 

function (req, res) {
    try {
        // TODO: Sanitize email?
        let email = req.body.email;
        let company = req.user.company;
        crypto.randomBytes(16, (err, hash) => {
            hash = hash.toString('hex')
            let inviteLink = `http://localhost:9000/inviteUser/accept_invite/${hash}`;
            db.createRegistration(hash, company, email).then(() => {
                let content = "Welcome to KIWI!\n" + "You have invited to the " + company + " KIWI forum!" + "\n" + "Please click the link below to get started." + "\n" + inviteLink  + "\n";
                db.sendEmail(email, "test", content);
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

