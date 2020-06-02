const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect Database
connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.use("/api/auth", require("./routes/api/authAPI"));
app.use("/api/maps", require("./routes/api/mapAPI"));
app.use("/api/profile", require("./routes/api/profileAPI"));
app.use("/api/admin", require("./routes/api/adminAPI"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
