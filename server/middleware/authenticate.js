const { User } = require('./../models/user');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');
  console.log('authenticate token', token);
  
  User.findByToken(token).then(user => {
    console.log('authenticate user', user);
    
    if(!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch(e => {
    res.status(401).send();
  });
};

module.exports = { authenticate };