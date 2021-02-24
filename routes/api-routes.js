
const db = require('../models');

// Routes

module.exports = (app) => {
  
  app.get('/api/jokes', (req, res) => {
    
    db.Joke.findAll({}).then((dbJoke) => res.json(dbJoke));
  });


  app.post('/api/jokes', (req, res) => {

    
  });


  app.delete('/api/jokes/:id', (req, res) => {

    
  });

  app.put('/api/jokes', (req, res) => {
    

  });
  

  
};
