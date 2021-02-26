require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
const rawWeatherData = require('../data/weatherjson.js');

const { formatGeo, formatWthr, formatReviews } = require('../lib/mungeUtils.js');

describe('app routes', () => {
  describe('routes', () => {
    let token;

    // beforeAll(async done => {
    //   execSync('npm run setup-db');

    //   client.connect();

    //   const signInData = await fakeRequest(app)
    //     .post('/auth/signup')
    //     .send({
    //       email: 'jon@user.com',
    //       password: '1234'
    //     });

    //   token = signInData.body.token; // eslint-disable-line

    //   return done();
    // });

    // afterAll(done => {
    //   return client.end(done);
    // });


    test('returns formatted location information', async () => {
      const rawLocationData = [
        {
          place_id: 58246050,
          licence: 'https://locationiq.com/attribution',
          osm_type: 'node',
          osm_id: 4844606089,
          boundingbox:
            [
              47.2058241,
              47.2059241,
              -1.7796128,
              -1.7795128
            ],
          lat: 45.5202471,
          lon: -122.6741949,
          display_name: 'Portland, Multnomah, Oregon, USA',
          class: 'amenity',
          type: 'post_box',
          importance: 0.11100000000000002
        }
      ];

      const expectation = {
        formatted_query: 'Portland, Multnomah, Oregon, USA',
        latitude: 45.5202471,
        longitude: -122.6741949
      };

      const mungedLocal = formatGeo(rawLocationData);

      expect(mungedLocal).toEqual(expectation);
    });

    test('returns formatted weather information', async () => {
      const expectation = [
        {
          forecast: 'Scattered clouds',
          time: 'Tue May 05 2020'
        },
        {
          forecast: 'Light snow',
          time: 'Wed May 06 2020'
        },
        {
          forecast: 'Few clouds',
          time: 'Thu May 07 2020'
        },
        {
          forecast: 'Few clouds',
          time: 'Fri May 08 2020'
        },
        {
          forecast: 'Broken clouds',
          time: 'Sat May 09 2020'
        },
        {
          forecast: 'Overcast clouds',
          time: 'Sun May 10 2020'
        },
        {
          forecast: 'Overcast clouds',
          time: 'Mon May 11 2020'
        }
      ];

      const mungedLocal = formatWthr(rawWeatherData);

      expect(mungedLocal).toEqual(expectation);
    });

  });
});



// weather -   http://localhost:3002/weather?latitude=45.5202471&longitude=-122.6741949
//reviews -   http://localhost:3002/reviews?latitude=45.5202471&longitude=-122.6741949