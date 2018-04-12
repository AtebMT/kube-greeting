const request = require('request-promise');
const express = require('express');
const os = require('os');
const app = express();

app.get('/', async (req, res) => {
  const prefix = await request.get('http://kube-hello-service:6002/');
  res.send(`${prefix} to you from ${os.hostname}!`);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
