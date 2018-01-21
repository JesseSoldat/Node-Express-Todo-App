const { Todo} = require('../models/todo');
const { authenticate } = require('../middleware/authenticate');
const { ObjectID } = require('mongodb');

module.exports = app => {
  app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    });

    todo.save().then(doc => {
      res.send(doc);
    }, e => res.status(400).send(e))
  });
}