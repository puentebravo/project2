const { QueryTypes } = require("sequelize");
const db = require("../models");

// Routes

module.exports = (app) => {
  app.get("/api/jokes", (req, res) => {
    db.Joke.findAll({}).then((dbJoke) => res.json(dbJoke));
  });

  app.get("/", (req, res) => {
    const inboundObj = await db.query("SELECT * FROM Jokes ORDER BY RAND() LIMIT 1;", {
      type: QueryTypes.SELECT,
    })
    res.render("index", inboundObj)
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
