//Express and Server setup
const express = require('express');
const app = express();
const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



//Static files path
app.use(express.static('client'));

app.get('/', (req, res) => {
  res.send('Helloooo Woooorld!')
})

//Get key from enviroment variable
require('dotenv').config();
const GEO_API_KEY = process.env.GEO_API_KEY;
//Proxy Server and API Route
const fetch = require('node-fetch');
app.get('/geoloc/:IP', async (request,response) => {
  const ip = request.params.IP;
  const geo_url = `https://geo.ipify.org/api/v2/country,city?apiKey=${GEO_API_KEY}&ipAddress=${ip}`;
  // const geo_url = `https://geo.ipify.org/api/v2/country,city?apiKey=${GEO_API_KEY}${ip ? '&ipAddress=' + `${ip}` : ''}`;
  const fetch_response = await fetch(geo_url);
  const obj = await fetch_response.json();
  response.json(obj);
});

app.get('/autoip', async (request,response) => {
  const geo_url = `https://geo.ipify.org/api/v2/country,city?apiKey=${GEO_API_KEY}`;
  const fetch_response = await fetch(geo_url);
  const obj = await fetch_response.json();
  response.json(obj.ip);
});

