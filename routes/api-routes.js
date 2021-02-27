// const { QueryTypes } = require("sequelize");
const db = require("../models");
const passport = require("../config/passport");
// Routes

module.exports = (app) => {

  app.get("/", (req, res) => {

    db.Joke.findOne({ order: db.sequelize.random() }).then((data) => {
      console.log(data);
      console.log(data.quote);
      const groaner = {
        quote: data.quote,
        author: data.author,
        origin: data.origin,
      };
      res.render("index", groaner, { title: 'homepage', style: 'index.css' } );
    });
  });


  app.get("/api/jokes", (req, res) => {
    db.Joke.findAll({}).then((dbJoke) => res.json(dbJoke)
    );
    res.render('repunsatory', {
      title: 'repunsatory',
      style: 'repunsatory.css'
    });
});

router.get('/profile', (req, res) => {
  db.all((data) => {
    res.render('profile', { 
      title: 'Profile',
      style: profile.css
    });
  });
});



app.post("/api/jokes", (req, res) => {
  db.Joke.create(
    {
    quote: req.body.quote,
    author: req.body.author,
    origin: req.body.origin,
    }
    ).then((dbJoke) => res.json(dbJoke));
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
