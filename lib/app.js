const express = require('express');
const cors = require('cors');
const request = require('superagent');
const app = express();
const morgan = require('morgan');
const { formatGeo, formatWthr } = require('./mungeUtils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging


app.get('/location', async (req, res) => {
  try {
    const cityName = req.query.search;

    const geoData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.GEOLOCATION_KEY}&q=${cityName}&format=json`);

    const formattedData = formatGeo(geoData.body);

    res.json(formattedData);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async (req, res) => {
  try {
    const lat = req.query.latitude;
    const long = req.query.longitude;

    const wthrData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${long}&key=${process.env.WEATHERBIT_KEY}`);

    const formattedWthr = formatWthr(wthrData.body);

    res.json(formattedWthr);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/reviews', async (req, res) => {
  try {
    res.json([
      {
        name: 'Pike Place Chowder',
        image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/ijju-wYoRAxWjHPTCxyQGQ/o.jpg',
        price: '$$   ',
        rating: '4.5',
        url: 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA'
      },
      {
        name: 'Umi Sake House',
        image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/c-XwgpadB530bjPUAL7oFw/o.jpg',
        price: '$$   ',
        rating: '4.0',
        url: 'https://www.yelp.com/biz/umi-sake-house-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA'
      }
    ]
    );

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
