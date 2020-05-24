const express = require("express");
const path = require('path');
const app = express();
const cors = require('cors');

var inviteRouter = require('./routes/invite/index');
var authRouter = require('./routes/auth/index');
var postsRouter = require('./routes/posts/index');
var tagsRouter = require('./routes/tags/index')
var responseRouter  = require('./routes/responses/index');
var cookieParser = require('cookie-parser');
var {startAlgolia} = require('./firebase');

startAlgolia(); // Start Listening for updates


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

app.use('/inviteUser', inviteRouter);
app.use('/Response', responseRouter);
app.use('/auth', authRouter.router);
app.use('/posts', postsRouter);
app.use('/tags', tagsRouter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
  );
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  next();
});

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
