const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

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

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
