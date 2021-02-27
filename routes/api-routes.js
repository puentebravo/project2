const { QueryTypes } = require("sequelize");
const db = require("../models");

// Routes

module.exports = (app) => {

  app.get("/", (req, res) => {
    const inboundObj = db.sequelize.query(
      "SELECT * FROM Jokes ORDER BY RAND() LIMIT 1;",
      {
        type: QueryTypes.SELECT,
        title: 'homepage',
        style: 'index.css'
      },
    );
    res.render("index", inboundObj);
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
};
