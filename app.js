const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const logger = require("./middlewares/logger");
const photoPackagesRoutes = require("./routes/photoPackagesRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Route
app.use("/photo-packages", photoPackagesRoutes);

// Menangani route yang tidak ditemukan
app.use((req, res, next) => {
    const error = new Error("Route tidak ditemukan");
    error.status = 404;
    next(error);
});

// Penanganan error terpusat
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});