// routes/cities.js
const express = require("express");
const router = express.Router();

const { allowedCityIds, cityNames } = require("../utils/cities");

router.get("/", (req, res) => {
  const cities = allowedCityIds.map(id => ({
    id,
    name: cityNames[id]
  }));

  res.json(cities);
});

module.exports = router;