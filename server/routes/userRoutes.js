const pick = require('lodash').pick;
const { User } = require('../models/user');
const { authenticate } = require('../middleware/authenticate');

module.exports = app => {

  app.post('/users', (req, res) => {
    let body = pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then(token => {
      res.header('x-auth', token).send(user);
    }).catch(e => {
      console.log('error', e);
      res.status(400).send(e);
    });
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

  app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
  });

  app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send({ 'token': null });
    }, (e) => res.status(400).send(e));
  });

 


}