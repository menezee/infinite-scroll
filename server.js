const express = require('express');
const http = require('http');
const app = express();

const port = process.env.PORT || 5000;

app.get('/api/animals', (req, res) => {
  const { count } = req.query;
  const BASE_URL = `http://shibe.online/api/shibes?count=${count}`;

  http.get(BASE_URL, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.send(JSON.parse(data));
    });
  })
    .on('error', (err) => {
      res.sendStatus(500);
    });

});

app.use(express.static('build'));

app.listen(port, () => console.log(`proxy listening on port ${port}!`));