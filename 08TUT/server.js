const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

//as we took this fun into middleware and imported logger from it, so
app.use(logger);

const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1.5500",
  "http://localhost:3500",
  "https://www.google.com.pk",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); //first paramter is usally null which is error sothere's no error, and 2nd argument is origin will sent back sating roigin its allowed
    } else {
      callback(new Error("not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};

// cross origin resource sharing
app.use(cors(corsOptions));

//built in middleware to handle urelecoded data
// in other words, form data:
// 'contentr-type': 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//built in middleware to handle json data
// 'content-type': 'application/json'
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "public")));
//above one use '/' but for use in subdirectory too we use below one
app.use("/subdir", express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
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
