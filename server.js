const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/', (req, res, next) => {
  express.static(path.join(__dirname, 'build'))(req, res, next);
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Drips manage listening on port ${port}!`));
