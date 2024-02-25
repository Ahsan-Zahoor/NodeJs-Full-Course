const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

//custom middleware logger
// app.use((req, res, next) => {
//   logEvents(
//     `Req-url : ${req.url} - Req-Origin : ${req.headers.origin} - Req path :${req.url}`,
//     "reqLog.log"
//   );
//   // console.log(
//   //   `Req-url : ${req.url} - Req-Method : ${req.method} - Req path :${req.path}`
//   // );
//   next();
// });

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

app.get("^/$|/index(.html)?", (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.redirect("/new-page.html"); // 302 by default and 302 doesnt let search engine to change saying it is a permenant redifect
  res.redirect(301, "/new-page.html"); // 301 is permenant redirect
});

//Route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempting to access hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello from the next!");
  }
);

//chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finishes in three!");
};

app.get("/chain(.html)?", [one, two, three]);

//app.use('/) app.use not accept regex and mostly likely to use middleware
// app.get("/*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });
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
