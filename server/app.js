const express = require("express");
const path = require('path');
const app = express();
const cors = require('cors');

var inviteRouter = require('./routes/invite/index');
var authRouter = require('./routes/auth/index');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/inviteUser', inviteRouter);
app.use('/auth', authRouter);

/* will need this when we move to production 
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
*/

app.get('/', () => console.log("hello world"));

const port = 9000;
app.listen(9000);

module.exports = app;