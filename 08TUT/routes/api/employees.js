const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../data/employees.json");
console.log("Data -> ", data.employees);

router
  .route("/")
  .get((req, res) => {
    console.log("in get req -> ", req);
    res.json(data.employees);
  })
  .post((req, res) => {
    console.log("post req -> ", req.body);
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .delete((req, res) => {
    res.json({ id: req.body.id });
  });

router.route("/:id").get((req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;
