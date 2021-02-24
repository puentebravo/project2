
const db = require('../models');

// Routes

module.exports = (app) => {
  
  app.get('/api/jokes', (req, res) => {
    
    db.Joke.findAll({}).then((dbJoke) => res.json(dbJoke));
  });


  app.post('/api/jokes', (req, res) => {

    db.Joke.create({

      quote: req.body.quote,
      author: req.body.author,
      origin: req.body.origin

    }).then((dbJoke) => res.json(dbJoke));

  });


  app.delete('/api/jokes/:id', (req, res) => {

    db.Joke.destroy({
      where: 
      {
        id: req.params.id,
      },

    }).then((dbJoke) => res.json(dbJoke));

  });



app.put('/api/jokes', (req, res) => {
  db.Joke.update(
    {
      quote: req.body.quote,
      author: req.body.author,
      origin: req.body.origin
    },
    {
      where: {
        id: req.body.id,
      },
    }
  ).then((dbJoke) => res.json(dbJoke));
});
  
};
