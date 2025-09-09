const express = require("express");
const router = express.Router();

// Example endpoint: get ocean parameters
router.get("/", async (req, res) => {
  res.json([
    { location: "Kerala Coast", temp: 27.5, salinity: 35.2 },
    { location: "Goa Coast", temp: 28.1, salinity: 34.9 }
  ]);
});

module.exports = router;
