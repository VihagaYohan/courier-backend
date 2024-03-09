const NodeGeocoder = require("node-geocoder");
// const config = require("config");

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  //apiKey: process.env.GOOGLE_GEO_API_KEY,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
