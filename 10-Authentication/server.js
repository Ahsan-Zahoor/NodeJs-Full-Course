const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

//as we took this fun into middleware and imported logger from it, so
app.use(logger);

// cross origin resource sharing
app.use(cors(corsOptions));

//built in middleware to handle urelecoded data
app.use(express.urlencoded({ extended: false }));

//built in middleware to handle json data
// 'content-type': 'application/json'
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/employees", require("./routes/api/employees"));

//app.all apply to all http methods at once
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "views", "404.html"));
  }
  if (req.accepts("json")) {
    return res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
