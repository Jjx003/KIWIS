require('dotenv').config();
var mailgun = require('mailgun-js');
var { db } = require('../../firebase');
const mg = mailgun({
    apiKey:	process.env.MAILGUN_API_KEY, 
	domain: 'mg.kiwis.tech', 
});
var parent = require('../common_models');

function checkRegistration(id) {
    return parent.checkRegistration(id);
}

function createRegistration(id, company, email) {
    return db.database().ref(`/Registrations/${id}`).set({ expected_company: company, expected_email: email });
}

function sendEmail(email, subject, content) {
    const data = {
        "from": "KIWI Forum <no-reply@mg.kiwis.tech>",
        "to": email,
        "subject": subject ? subject : 'Hello',
        "text": content,
    }
    mg.messages().send(data, function (error, body) {
        console.log(body);
        console.log(error);
    })
}

module.exports = { checkRegistration, createRegistration, sendEmail };