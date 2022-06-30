// @ts-nocheck
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

app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', {campgrounds: campgrounds});
});

app.get('/campgrounds/:id', async (req, res) => {
  res.render('campgrounds/show');
});

app.listen(33333, () => {
  console.log('Serving on port 33333');
});