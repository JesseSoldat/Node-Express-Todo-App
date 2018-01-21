require('./config/config');
const { authenticate } = require('./middleware/authenticate');

const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const app = express();
const port = process.env.PORT;
const pick = require('lodash').pick;
const { User } = require('./models/user');

app.use(bodyParser.json());

app.post('/users', (req, res) => {
  let body = pick(req.body, ['email', 'password']);
  let user = new User(body);
  
  user.save().then(() => {
    return user.generateAuthToken();
  }).then(token => {
    console.log('user', user);
    
    res.header('x-auth', token).send(user);
  }).catch(e => {
    console.log('error', e);
    res.status(400).send(e);
  }); 
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  let body = pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    }).catch(e => res.status(400).send(e));
});

app.get('*', (req, res) => {
  res.send({'jlab': 'rocking around the clock!'});
});

app.listen(port, () => {
  console.log(`All ears on port ${port}`);
  
});