const db = require("../models");
const passport = require("../config/passport");
// Routes

module.exports = (app) => {
  app.get("/", (req, res) => {
    db.Joke.findOne({ order: db.sequelize.random() }).then((data) => {
      const groaner = {
        quote: data.quote,
        author: data.author,
        origin: data.origin,
        style: "index.css",
      };
      res.render("index", groaner);
    });
  });

  app.get("/repunsatory", (req, res) => {
    db.Joke.findAll({ raw: true }).then((data) => {
      const groanList = {
        Joke: data,
        style: "repunsatory.css",
      };
      res.render("repunsatory", groanList);
    });
  });

  app.get("/profile", (req, res) => {
    db.Joke.findAll({ raw: true }).then((data) => {
      const userLists = {
        Joke: data,
        style: "profile.css",
      };
      res.render("profile", userLists);
    });
  });

  app.get("/signup", (req, res) => {
    db.Joke.findOne({ order: db.sequelize.random() }).then((data) => {
      const signupGroaner = {
        quote: data.quote,
        author: data.author,
        origin: data.origin,
        style: "index.css",
      };
      res.render("signup", signupGroaner);
    });
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
        isSaved: req.body.isSaved,
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
      password: req.body.password,
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
        id: req.user.id,
      });
    }
  });
};
