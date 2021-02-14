const express = require('express');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/getsignature', express.json(), (req, res) => {
  console.log(req.body);
  const signature = cloudinary.utils.api_sign_request(req.body, 'lpirOgnSkybK6jANoivYsimLlxk');
  res.send({ signature });
})

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);