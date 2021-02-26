const express = require('express');
const router = express.Router();

const db = require('../models/');

router.get('/', (req, res) => {
  db.all((data) => {
    res.render('index', title:Express);
  });
});

router.post('/api/', (req, res) => {
  db.create(['quote', 'author', 'origin'], [req.body.quote, req.body.author, req.body.origin], (result) => {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put('/api/jokes/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  db.update(
    {
      quote: req.body.quote,
      author: req.body.author,
      origin: req.body.origin,
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.delete('/api/jokes/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  db.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});


module.exports = router;





















