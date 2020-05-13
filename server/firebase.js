var firebase_init = require('firebase');
var firebase_admin = require('firebase-admin');
require('dotenv').config();

const db = firebase_init.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.ID,
    measurementId: process.env.MEASUREMENT_ID
});

// used for generating tokens
var serviceAccount = require("./serviceKey.json");
const admin = firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});


module.exports = { db, admin };