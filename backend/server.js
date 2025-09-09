const express = require("express");
const cors = require("cors");
const speciesRoutes = require("./routes/species");
const oceanRoutes = require("./routes/ocean");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/species", speciesRoutes);
app.use("/api/ocean", oceanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
