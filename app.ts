const express = require('express');
const path = require('path');
const Mongoose = require('mongoose');
const Campground = require('./models/campground');

Mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database successfully connected');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/make_campground', async (req, res) => {
  const camp = new Campground({title: 'My Backyard', description: 'an awesome place with gardens and chickens!'});
  await camp.save();
  res.send(camp);
});

app.listen(33333, () => {
  console.log('Serving on port 33333');
});