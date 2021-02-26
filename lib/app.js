const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const geoData = require('../data/geojson.js');
const wthrData = require('../data/weatherjson.js');
const { formatGeo, formatWthr } = require('./mungeUtils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging


app.get('/location', async (req, res) => {
  try {
    const formattedData = formatGeo(geoData);
    res.json(formattedData);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async (req, res) => {
  try {
    const formattedWthr = formatWthr(wthrData);
    // const data = await client.query('SELECT * from animals');

    res.json(formattedWthr);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/reviews', async (req, res) => {
  try {
    // const data = await client.query('SELECT * from animals');

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
