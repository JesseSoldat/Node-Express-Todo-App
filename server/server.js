require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { mongoose } = require('./db/mongoose');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());


require('./routes/userRoutes')(app);
require('./routes/todoRoutes')(app);

app.get('*', (req, res) => {
  res.send({'jlab': 'rocking around the clock!'});
});

app.listen(port, () => {
  console.log(`All ears on port ${port}`);
  
});