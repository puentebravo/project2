// const { QueryTypes } = require("sequelize");
const db = require("../models");
// Routes

module.exports = (app) => {
  app.get("/api/jokes", (req, res) => {
    db.Joke.findAll({}).then((dbJoke) => res.json(dbJoke));
  });

  app.get("/", (req, res) => {
    db.Joke.findOne({ order: db.sequelize.random() }).then((data) => {
      console.log(data);
      console.log(data.quote);
      const groaner = {
        quote: data.quote,
        author: data.author,
        origin: data.origin,
      };
      res.render("index", groaner);
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
