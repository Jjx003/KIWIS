const express = require("express");
const path = require('path');
const app = express();

var inviteRouter = require('./routes/invite');
app.use('/inviteUser', inviteRouter);
app.use(express.static(path.join(__dirname, 'build')));
const port = 9000;
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);

module.exports = app;