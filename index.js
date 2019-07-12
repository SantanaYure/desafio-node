const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

nunjucks.configure("views", {
  autoescape: true,
  express: server,
  watch: true
});

server.set("view engine", "njk");
server.use(express.urlencoded({ extended: false }));

const checkData = (req, res, next) => {
  const { name, age } = req.query;

  if (!name || !age) {
    return res.redirect("/");
  }
  return next();
};

server.get("/", (req, res) => {
  return res.render("main");
});

server.get("/container", checkData, (req, res) => {
  const { name, age } = req.query;

  return res.render("container", { name, age });
});

server.get("/alert", checkData, (req, res) => {
  const { name, age } = req.query;

  return res.render("alert", { name, age });
});

server.post("/check", (req, res) => {
  const { name, age } = req.body;

  if (age >= 18) {
    return res.redirect(`/container?name=${name}&age=${age}`);
  } else {
    return res.redirect(`/alert?name=${name}&age=${age}`);
  }
});

server.listen(3333);
