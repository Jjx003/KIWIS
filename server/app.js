const express = require('express')
const app = express()
const port = process.env.PORT || 5001; // Modify accordingly

console.log("server running");

/* Redirect http to https */
app.get('*', function(req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
      res.redirect('https://' + req.hostname + req.url)
    else
      next() /* Continue to other routes if we're not redirecting */
  });

app.get('/', (req, res) => res.send('asd foasdfiasdfj iasdfjkadfs lHello World!'))
app.listen(port, () => console.log(`Examople app listening at http://localhost:${port}`))