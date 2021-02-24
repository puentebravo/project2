
const db = require('../models');

// Routes

module.exports = (app) => {
  
  app.get('/api/jokes', (req, res) => {
    
    db.Joke.findAll({}).then((dbJoke) => res.json(dbJoke));
  });

  
};
