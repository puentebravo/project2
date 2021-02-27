const { QueryTypes } = require("sequelize");
const db = require("../models");
const passport = require("../config/passport");
// Routes

module.exports = (app) => {
  app.get("/api/jokes", (req, res) => {
    db.Joke.findAll({}).then((dbJoke) => res.json(dbJoke));
  });

  app.get("/", (req, res) => {
    const inboundObj = db.sequelize.query(
      "SELECT * FROM Jokes ORDER BY RAND() LIMIT 1;",
      {
        type: QueryTypes.SELECT,
      }
    );
    res.render("index", inboundObj);
  });

  app.post("/api/jokes", (req, res) => {
    db.Joke.create({
      quote: req.body.quote,
      author: req.body.author,
      origin: req.body.origin,
    }).then((dbJoke) => res.json(dbJoke));
  });

  app.delete("/api/jokes/:id", (req, res) => {
    db.Joke.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbJoke) => res.json(dbJoke));
  });

  app.put("/api/jokes", (req, res) => {
    db.Joke.update(
      {
        quote: req.body.quote,
        author: req.body.author,
        origin: req.body.origin,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then((dbJoke) => res.json(dbJoke));
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
