const express = require("express");
const router = express.Router();

// Example endpoint: get species data
router.get("/", async (req, res) => {
  res.json([
    { name: "Indian Mackerel", location: "Kerala Coast", abundance: 120 },
    { name: "Sardine", location: "Goa Coast", abundance: 85 }
  ]);
});

module.exports = router;
