const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from YelpCamp!');
});

app.listen(33333, () => {
  console.log('Serving on port 33333');
});