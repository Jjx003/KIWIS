const express = require("express");
const app = express();

var inviteRouter = require('./routes/invite');

const port = 9000;
app.get('/', (req, res) => res.send("hello world"));

app.listen(9000);

module.exports = app;