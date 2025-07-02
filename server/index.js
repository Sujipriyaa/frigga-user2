const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const auth = require("./middleware/authMiddleware"); // ✅ Import this

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// ✅ Add this route AFTER app.use
app.get("/api/private", auth, (req, res) => {
  res.send(`Hello User ID: ${req.user.id}`);
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
