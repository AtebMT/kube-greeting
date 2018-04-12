const express = require('express');
const {hostname} = require('os');
const app = express();

app.get('/', (req, res) => res.send(`Hello from ${hostname}`));

app.listen(4000, () => console.log('Example app listening on port 3000!'));
