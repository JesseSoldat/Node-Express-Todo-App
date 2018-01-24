const { Todo} = require('../models/todo');
const { authenticate } = require('../middleware/authenticate');
const pick = require('lodash').pick;
const isBoolean = require('lodash').isBoolean;

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
 
  app.get('/todos', authenticate, (req, res) => {
    Todo.find({
      _creator: req.user._id,
    }).then(todos => {
      res.send({todos});
    }, e => res.status(400).send(e));
  });

  app.get('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    console.log('GET ID', id);
    
    if(!ObjectID.isValid(id)) {
      return res.status(404).send({'msg': 'The todo id is not valid!'});
    }

    Todo.findOne({
      _id: id,
      _creator: req.user._id
    }).then(todo => {
      
      if(!todo) {
        return res.status(404).send({'msg': 'The todo was not found!'});
      }
      res.status(200).send({ todo });
      
    }).catch(e => res.status(400).send({'msg': e}))
  });

  app.delete('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    console.log('ID', id);
    
    if(!ObjectID.isValid(id)) {
      return res.status(404).send({'msg': 'The todo id is not valid!'});
    }

    Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    }).then(todo => {
      if(!todo) {
        return res.status(404).send({'msg': 'The todo could NOT be deleted!'});
      }
      res.send({todo});
    }).catch(e => {
      res.status(400).send({'msg': e});
    });
  });

  app.patch('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const body = pick(req.body, ['text', 'completed']);
    console.log('body', body);

    if (!ObjectID.isValid(id)) {
      return res.status(404).send({ 'msg': 'The todo id is not valid!' });
    }

    if (isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then(todo => {
      if (!todo) {
        return res.status(404).send({ 'msg': 'Could not update the todo!' });
      }

      res.status(200).send({ todo });
    }).catch(e => res.status(400).send({ 'msg': e }));
  });


}